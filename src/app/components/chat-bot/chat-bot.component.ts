import { Component, ElementRef, ViewChild, inject, signal, effect, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ChatBotService } from './chat-bot.service';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chat-bot',
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Toggle Button (Like Theme Toggle, positioned above it) -->
    <button (click)="toggleChat()"
            class="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 text-text dark:text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            [class.bg-accent]="chatService.isOpen()"
            [class.text-primary]="chatService.isOpen()"
            [class.dark:text-[#272635]]="chatService.isOpen()"
            aria-label="Toggle Chat Bot">
      <span class="material-symbols-outlined transition-transform duration-500"
            [class.rotate-[360deg]]="chatService.isOpen()">
        {{ chatService.isOpen() ? 'close' : 'smart_toy' }}
      </span>
    </button>

    <!-- Slide-out Drawer Panel -->
    <div [class.translate-x-0]="chatService.isOpen()"
         [class.translate-x-full]="!chatService.isOpen()"
         class="fixed top-0 right-0 h-full w-full sm:w-[400px] z-[100] bg-surface/90 dark:bg-surface/95 backdrop-blur-lg border-l border-border/50 dark:border-accent/30 dark:box-glow-border shadow-2xl transition-transform duration-300 ease-in-out flex flex-col font-roboto-mono text-text">
      
      <!-- Panel Header -->
      <div class="p-4 border-b border-border/50 dark:border-white/10 flex items-center justify-between bg-primary/5 dark:bg-white/5">
        <div class="flex items-center gap-3">
          <div class="relative flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 text-accent">
            <span class="material-symbols-outlined">smart_toy</span>
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-surface rounded-full"></span>
          </div>
          <div>
            <h3 class="font-bold text-sm leading-tight text-text">marCodes Bot</h3>
            <span class="text-[10px] text-text-muted">Online • AI Assistant</span>
          </div>
        </div>
        <button (click)="closeChat()" class="p-1 rounded-full hover:bg-primary/10 dark:hover:bg-white/10 text-text transition-colors cursor-pointer">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Messages Area -->
      <div #scrollContainer class="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        @for (msg of messages(); track msg.timestamp) {
          <div class="flex" [class.justify-end]="msg.sender === 'user'" [class.justify-start]="msg.sender === 'bot'">
            <div class="max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-sm"
                 [class.bg-text]="msg.sender === 'user'"
                 [class.text-white]="msg.sender === 'user'"
                 [class.bg-surface]="msg.sender === 'bot'"
                 [class.border]="msg.sender === 'bot'"
                 [class.border-border/30]="msg.sender === 'bot'"
                 [class.dark:bg-white/5]="msg.sender === 'bot'"
                 [class.dark:border-white/10]="msg.sender === 'bot'"
                 [class.dark:bg-accent]="msg.sender === 'user'"
                 [class.dark:text-[#272635]]="msg.sender === 'user'"
                 [class.dark:box-glow]="msg.sender === 'user'">
              <p class="leading-relaxed whitespace-pre-line">{{ msg.text }}</p>
              <span class="block text-[8px] mt-1 text-right"
                    [class.text-white/60]="msg.sender === 'user'"
                    [class.text-text-muted]="msg.sender === 'bot'"
                    [class.dark:text-[#272635]/60]="msg.sender === 'user'">
                {{ msg.timestamp | date:'shortTime' }}
              </span>
            </div>
          </div>
        }

        <!-- Typing Indicator -->
        @if (isTyping()) {
          <div class="flex justify-start">
            <div class="bg-surface border border-border/30 dark:bg-white/5 dark:border-white/10 rounded-2xl px-4 py-3 shadow-sm flex gap-1 items-center">
              <span class="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        }
      </div>

      <!-- Quick Suggestion Chips Header & Rotate Button -->
      <div class="px-4 pt-3 pb-1 flex justify-between items-center bg-primary/[0.02] dark:bg-white/[0.02] border-t border-border/20 dark:border-white/5">
        <span class="text-[9px] font-bold text-text-muted uppercase tracking-wider">Suggested Topics</span>
        <button type="button"
                (click)="rotateChips()"
                class="flex items-center gap-1 text-[9px] font-bold text-accent hover:text-accent/80 transition-colors cursor-pointer focus:outline-none">
          <span class="material-symbols-outlined text-[12px] leading-none">sync</span>
          Rotate
        </button>
      </div>

      <!-- Quick Suggestion Chips -->
      <div class="px-4 pb-3 pt-1 flex flex-wrap gap-2 bg-primary/[0.02] dark:bg-white/[0.02]">
        @for (chip of visibleChips(); track chip) {
          <button (click)="sendPresetMessage(chip)"
                  class="text-[10px] px-3 py-1.5 rounded-full border border-border/40 hover:border-accent hover:text-accent transition-all duration-300 bg-surface/60 dark:bg-white/5 dark:border-white/10 dark:hover:border-accent cursor-pointer active:scale-95">
            {{ chip }}
          </button>
        }
      </div>

      <!-- Input Bar -->
      <form (submit)="sendMessage($event)" class="p-4 border-t border-border/50 dark:border-white/10 flex gap-2 items-center bg-primary/5 dark:bg-white/5">
        <input [(ngModel)]="userInput"
               name="userInput"
               type="text"
               placeholder="Ask about Marco..."
               class="flex-1 bg-surface border border-border/50 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-accent font-roboto-mono" />
        <button type="submit"
                class="w-9 h-9 rounded-xl bg-text text-white dark:bg-accent dark:text-[#272635] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer dark:box-glow">
          <span class="material-symbols-outlined text-sm">send</span>
        </button>
      </form>

    </div>
  `
})
export class ChatBotComponent {
  readonly chatService = inject(ChatBotService);
  private readonly http = inject(HttpClient);
  
  userInput = '';
  readonly messages = signal<Message[]>([]);
  readonly isTyping = signal(false);

  readonly questionPool = [
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

  readonly visibleChips = signal<string[]>([]);

  @ViewChild('scrollContainer') private scrollContainer?: ElementRef;

  constructor() {
    // Add default welcome message
    this.messages.set([
      {
        sender: 'bot',
        text: "Hi! I am marCodes Bot, Marco's AI assistant. 🤖\n\nAsk me anything about Marco's software engineering experience, background, stack, or certifications!",
        timestamp: new Date()
      }
    ]);

    // Initialize with 3 random suggestions
    this.rotateChips();

    // Keep scroll position updated when messages change
    effect(() => {
      if (this.messages().length > 0) {
        setTimeout(() => this.scrollToBottom(), 50);
      }
    });
  }

  toggleChat() {
    this.chatService.toggle();
  }

  closeChat() {
    this.chatService.close();
  }

  sendPresetMessage(text: string) {
    this.userInput = text;
    this.sendMessage();
  }

  rotateChips() {
    // Shuffle pool and select first 3 items
    const shuffled = [...this.questionPool].sort(() => 0.5 - Math.random());
    this.visibleChips.set(shuffled.slice(0, 3));
  }

  sendMessage(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    const trimmedInput = this.userInput.trim();
    if (!trimmedInput || this.isTyping()) return;

    // Rotate suggestions for the next turn
    this.rotateChips();

    // Add user message
    this.messages.update(msgs => [
      ...msgs,
      { sender: 'user', text: trimmedInput, timestamp: new Date() }
    ]);
    this.userInput = '';

    // Show bot typing
    this.isTyping.set(true);

    // Call Vercel Edge Function via HttpClient
    this.http.post<{ reply: string }>('/api/chat', { message: trimmedInput }).subscribe({
      next: (response) => {
        this.isTyping.set(false);
        this.messages.update(msgs => [
          ...msgs,
          { sender: 'bot', text: response.reply, timestamp: new Date() }
        ]);
      },
      error: (err) => {
        console.error('Chat Bot API Error:', err);
        this.isTyping.set(false);
        this.messages.update(msgs => [
          ...msgs,
          {
            sender: 'bot',
            text: "I apologize, but I am experiencing temporary difficulties connecting to my brain. Please try again in a moment!",
            timestamp: new Date()
          }
        ]);
      }
    });
  }

  private scrollToBottom() {
    if (this.scrollContainer) {
      try {
        const el = this.scrollContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      } catch (err) {
        console.error('Scroll error:', err);
      }
    }
  }
}
