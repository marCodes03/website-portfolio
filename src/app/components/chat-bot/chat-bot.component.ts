import { Component, DestroyRef, afterRenderEffect, effect, inject, signal, viewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChatBotService } from './chat-bot.service';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const MAX_MESSAGE_LENGTH = 500;

/** Reply typing speed (CHG-0022): characters per second, time-based. */
const TYPING_CHARS_PER_SECOND = 80;
/** After this long without a reply the thinking bubble says it is still working. */
const SLOW_REPLY_MS = 8000;

const FALLBACK_REPLY =
  'I apologize, but I am experiencing temporary difficulties connecting to my brain. Please try again in a moment!';

const QUESTION_POOL = [
  'Who is Marco?',
  'What is his tech stack?',
  'Show certificates',
  'How to contact him?',
  'Where did he study?',
  'Tell me about Eyeko',
  'Tell me about VestiCare',
  'What is Smart Farming?',
  'Where does he teach?',
  'Did he win any awards?',
  'What is his work process?',
  'Tell me about outside work',
  'What did he build for his internship?',
  'What subjects does he teach at AMA?',
  'Which student groups did he lead?',
  'Tell me about his valedictory address',
  'What was his role in the USSC?',
  'Tell me about the Gerry Roxas Award',
  'Tell me about Dr. Danilo V. Ayap Academic Excellence',
  'What are his personal details?',
  'What is VestiCare app about?',
  'What was his role at ETI?',
  'What research paper did he present?',
  'Tell me about Technolympics 2019'
];

/** Unbiased Fisher-Yates shuffle returning a new array. */
function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

@Component({
  selector: 'app-chat-bot',
  imports: [ReactiveFormsModule, DatePipe],
  host: {
    '(document:keydown.escape)': 'onEscape()'
  },
  template: `
    <!-- Floating Toggle Button (positioned above the theme toggle) -->
    <button #toggleButton
            type="button"
            (click)="toggleChat()"
            class="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 text-text dark:text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            [class.bg-accent]="chatService.isOpen()"
            [class.text-primary]="chatService.isOpen()"
            [class.dark:text-on-accent]="chatService.isOpen()"
            [attr.aria-label]="chatService.isOpen() ? 'Close chat assistant' : 'Open chat assistant'"
            aria-controls="chat-panel"
            [attr.aria-expanded]="chatService.isOpen()">
      <span class="material-symbols-outlined transition-transform duration-500"
            aria-hidden="true"
            [class.rotate-[360deg]]="chatService.isOpen()">
        {{ chatService.isOpen() ? 'close' : 'smart_toy' }}
      </span>
    </button>

    <!-- Slide-out Drawer Panel. Hidden + inert while closed so it leaves the tab order and a11y tree. -->
    <div #chatPanel
         id="chat-panel"
         role="dialog"
         aria-modal="false"
         aria-label="Chat assistant"
         [attr.inert]="chatService.isOpen() ? null : ''"
         [class.translate-x-0]="chatService.isOpen()"
         [class.translate-x-full]="!chatService.isOpen()"
         [class.invisible]="!chatService.isOpen()"
         class="fixed top-0 right-0 h-full w-full sm:w-[400px] z-[100] bg-surface/90 dark:bg-surface/95 backdrop-blur-lg border-l border-border/50 dark:border-accent/30 dark:box-glow-border shadow-2xl transition-[transform,visibility] duration-300 ease-in-out flex flex-col font-roboto-mono text-text">

      <!-- Panel Header -->
      <div class="p-4 border-b border-border/50 dark:border-white/10 flex items-center justify-between bg-primary/5 dark:bg-white/5">
        <div class="flex items-center gap-3">
          <div class="relative flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 text-accent">
            <span class="material-symbols-outlined" aria-hidden="true">smart_toy</span>
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-surface rounded-full" aria-hidden="true"></span>
          </div>
          <div>
            <h2 class="font-bold text-sm leading-tight text-text">marCodes Bot</h2>
            <span class="text-xs text-text-muted">Online • AI Assistant</span>
          </div>
        </div>
        <button type="button"
                (click)="closeChat()"
                aria-label="Close chat assistant"
                class="w-11 h-11 flex items-center justify-center rounded-full hover:bg-primary/10 dark:hover:bg-white/10 text-text transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <span class="material-symbols-outlined" aria-hidden="true">close</span>
        </button>
      </div>

      <!-- Messages Area: log role announces new replies politely -->
      <div #scrollContainer
           role="log"
           aria-live="polite"
           aria-label="Conversation"
           tabindex="0"
           class="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 no-scrollbar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
        @for (msg of messages(); track msg.id) {
          <div class="flex" [class.justify-end]="msg.sender === 'user'" [class.justify-start]="msg.sender === 'bot'">
            <div class="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm"
                 [class.bg-text]="msg.sender === 'user'"
                 [class.text-white]="msg.sender === 'user'"
                 [class.bg-surface]="msg.sender === 'bot'"
                 [class.border]="msg.sender === 'bot'"
                 [class.border-border/30]="msg.sender === 'bot'"
                 [class.dark:bg-white/5]="msg.sender === 'bot'"
                 [class.dark:border-white/10]="msg.sender === 'bot'"
                 [class.dark:bg-accent]="msg.sender === 'user'"
                 [class.dark:text-on-accent]="msg.sender === 'user'"
                 [class.dark:box-glow]="msg.sender === 'user'">
              @if (typingMessageId() === msg.id) {
                <!-- Full text once for screen readers; the animated copy is hidden from them (CHG-0022 R13). -->
                <p class="sr-only">{{ msg.text }}</p>
                <p class="leading-relaxed whitespace-pre-line" aria-hidden="true">{{ msg.text.slice(0, typedLength()) }}<span class="typing-caret"></span></p>
              } @else {
                <p class="leading-relaxed whitespace-pre-line">
                  @if (msg.sender === 'user') {
                    <span class="sr-only">You: </span>
                  }{{ msg.text }}
                </p>
              }
              <span class="block text-xs mt-1 text-right"
                    [class.text-white/80]="msg.sender === 'user'"
                    [class.text-text-muted]="msg.sender === 'bot'"
                    [class.dark:text-on-accent/80]="msg.sender === 'user'">
                {{ msg.timestamp | date:'shortTime' }}
              </span>
              @if (typingMessageId() === msg.id) {
                <button type="button" (click)="finishTyping()"
                        class="tap-44 mt-1 text-xs font-bold text-accent underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
                  Skip typing
                </button>
              }
            </div>
          </div>
        }

        <!-- Thinking indicator: dots in a bot bubble (CHG-0022) -->
        @if (isTyping()) {
          <div class="flex justify-start">
            <div class="bg-surface border border-border/30 dark:bg-white/5 dark:border-white/10 rounded-2xl px-4 py-3 shadow-sm">
              <div class="flex gap-1.5 items-center" aria-hidden="true">
                <span class="thinking-dot" style="animation-delay: 0ms"></span>
                <span class="thinking-dot" style="animation-delay: 150ms"></span>
                <span class="thinking-dot" style="animation-delay: 300ms"></span>
              </div>
              @if (slowReply()) {
                <p class="mt-2 text-xs text-text-muted" aria-hidden="true">Still working on it…</p>
              }
            </div>
          </div>
        }
      </div>

      <!-- Typing status lives outside the message log so it is announced once, on its own. -->
      <div class="sr-only" role="status" aria-live="polite">{{ isTyping() ? (slowReply() ? 'Still working on it' : 'marCodes Bot is typing') : '' }}</div>

      <!-- Quick Suggestion Chips Header & Rotate Button -->
      <div class="px-4 pt-3 pb-1 flex justify-between items-center bg-primary/[0.02] dark:bg-white/[0.02] border-t border-border/20 dark:border-white/5">
        <span class="text-xs font-bold text-text-muted uppercase tracking-wider">Suggested Topics</span>
        <button type="button"
                (click)="rotateChips()"
                class="flex items-center gap-1 min-h-11 px-2 text-xs font-bold text-accent hover:text-accent/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded">
          <span class="material-symbols-outlined text-[14px] leading-none" aria-hidden="true">sync</span>
          Rotate
        </button>
      </div>

      <!-- Quick Suggestion Chips -->
      <div class="px-4 pb-3 pt-1 flex flex-wrap gap-2 bg-primary/[0.02] dark:bg-white/[0.02]">
        @for (chip of visibleChips(); track chip) {
          <button type="button"
                  (click)="send(chip)"
                  class="text-xs px-4 min-h-11 inline-flex items-center rounded-full border border-border/40 hover:border-accent hover:text-accent transition-[border-color,color,transform] duration-300 bg-surface/60 dark:bg-white/5 dark:border-white/10 dark:hover:border-accent cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {{ chip }}
          </button>
        }
      </div>

      <!-- Input Bar -->
      <form (submit)="onSubmit($event)" class="p-4 border-t border-border/50 dark:border-white/10 flex gap-2 items-center bg-primary/5 dark:bg-white/5">
        <label for="chat-input" class="sr-only">Message to marCodes Bot</label>
        <input #chatInput
               id="chat-input"
               [formControl]="input"
               type="text"
               autocomplete="off"
               [attr.maxlength]="maxLength"
               placeholder="Ask about Marco…"
               class="flex-1 bg-surface border border-border/50 dark:border-white/10 rounded-xl px-4 min-h-11 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent font-roboto-mono" />
        <button type="submit"
                aria-label="Send message"
                class="w-11 h-11 rounded-xl bg-text text-white dark:bg-accent dark:text-on-accent flex items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer dark:box-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <span class="material-symbols-outlined text-sm" aria-hidden="true">send</span>
        </button>
      </form>

    </div>
  `
})
export class ChatBotComponent {
  readonly chatService = inject(ChatBotService);
  private readonly http = inject(HttpClient);

  readonly maxLength = MAX_MESSAGE_LENGTH;
  readonly input = new FormControl('', { nonNullable: true });
  readonly messages = signal<Message[]>([
    {
      id: 0,
      sender: 'bot',
      text: "Hi! I am marCodes Bot, Marco's AI assistant. 🤖\n\nAsk me anything about Marco's software engineering experience, background, stack, or certifications!",
      timestamp: new Date()
    }
  ]);
  readonly isTyping = signal(false);
  readonly slowReply = signal(false);
  readonly typingMessageId = signal<number | null>(null);
  readonly typedLength = signal(0);
  readonly visibleChips = signal<string[]>(shuffle(QUESTION_POOL).slice(0, 3));

  private readonly scrollContainer = viewChild<ElementRef<HTMLElement>>('scrollContainer');
  private readonly chatInput = viewChild<ElementRef<HTMLInputElement>>('chatInput');
  private readonly toggleButton = viewChild<ElementRef<HTMLButtonElement>>('toggleButton');
  private readonly chatPanel = viewChild<ElementRef<HTMLElement>>('chatPanel');

  private readonly destroyRef = inject(DestroyRef);
  private nextId = 1;
  private slowTimer: ReturnType<typeof setTimeout> | null = null;
  private typingFrame: number | null = null;
  private wasOpen = false;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.clearSlowTimer();
      if (this.typingFrame !== null) cancelAnimationFrame(this.typingFrame);
    });

    // Keep the newest message in view.
    afterRenderEffect(() => {
      this.messages();
      this.isTyping();
      this.typedLength();
      this.slowReply();
      const el = this.scrollContainer()?.nativeElement;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });

    // Move focus into the dialog on open, and back to the toggle on close.
    effect(() => {
      const open = this.chatService.isOpen();
      if (open === this.wasOpen) {
        return;
      }
      this.wasOpen = open;
      // When closing, only pull focus back to the toggle if it was inside the panel (or nowhere);
      // closing with Escape while the visitor is elsewhere must not steal their focus.
      const active = document.activeElement;
      const returnFocus =
        !open && (!active || active === document.body || !!this.chatPanel()?.nativeElement.contains(active));
      // Delay past the first frame: the panel is `visibility: hidden` until its transition starts.
      setTimeout(() => {
        if (open) {
          this.chatInput()?.nativeElement.focus();
        } else if (returnFocus) {
          const opener = this.chatService.opener();
          const target = opener && opener.isConnected ? opener : this.toggleButton()?.nativeElement;
          target?.focus();
          this.chatService.opener.set(null);
        }
      }, 100);
    });
  }

  toggleChat() {
    this.chatService.toggle();
  }

  closeChat() {
    this.chatService.close();
  }

  onEscape() {
    if (!this.chatService.isOpen()) {
      return;
    }
    // A modal dialog handles its own Escape; do not also close the chat behind it.
    if (document.querySelector('app-project-modal [role=dialog], app-certificate-modal [role=dialog], app-contact-dialog [role=dialog]')) {
      return;
    }
    this.chatService.close();
  }

  rotateChips() {
    this.visibleChips.set(shuffle(QUESTION_POOL).slice(0, 3));
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.send(this.input.value);
  }

  send(text: string) {
    const trimmed = text.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!trimmed || this.isTyping()) return;

    this.rotateChips();
    this.finishTyping();
    this.addMessage('user', trimmed);
    this.input.reset();
    this.isTyping.set(true);
    this.slowReply.set(false);
    this.clearSlowTimer();
    this.slowTimer = setTimeout(() => this.slowReply.set(true), SLOW_REPLY_MS);

    this.http.post<{ reply?: string }>('/api/chat', { message: trimmed }).subscribe({
      next: (response) => {
        this.stopWaiting();
        if (response.reply) {
          this.addTypedReply(response.reply);
        } else {
          this.addMessage('bot', FALLBACK_REPLY);
        }
      },
      error: (err: unknown) => {
        console.error('Chat Bot API Error:', err);
        this.stopWaiting();
        this.addMessage('bot', FALLBACK_REPLY);
      }
    });
  }

  private addMessage(sender: Message['sender'], text: string): Message {
    const message: Message = { id: this.nextId++, sender, text, timestamp: new Date() };
    this.messages.update(msgs => [...msgs, message]);
    return message;
  }

  private stopWaiting() {
    this.isTyping.set(false);
    this.slowReply.set(false);
    this.clearSlowTimer();
  }

  private clearSlowTimer() {
    if (this.slowTimer !== null) {
      clearTimeout(this.slowTimer);
      this.slowTimer = null;
    }
  }

  /** Adds a bot reply and types it out (80 chars/s); instant when reduced motion is requested. */
  private addTypedReply(text: string) {
    const message = this.addMessage('bot', text);
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      return;
    }
    this.typedLength.set(0);
    this.typingMessageId.set(message.id);
    const start = performance.now();
    const step = (now: number) => {
      const length = Math.floor(((now - start) / 1000) * TYPING_CHARS_PER_SECOND);
      if (length >= text.length) {
        this.finishTyping();
        return;
      }
      this.typedLength.set(length);
      this.typingFrame = requestAnimationFrame(step);
    };
    this.typingFrame = requestAnimationFrame(step);
  }

  /** Shows the whole reply at once and stops the animation (Skip button, or a new message). */
  finishTyping() {
    if (this.typingFrame !== null) {
      cancelAnimationFrame(this.typingFrame);
      this.typingFrame = null;
    }
    this.typingMessageId.set(null);
  }
}
