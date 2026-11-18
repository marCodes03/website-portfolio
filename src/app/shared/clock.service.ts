import { Injectable } from '@angular/core';

/**
 * The one place the app reads the current time, so components never reach for the
 * `Date` global directly (AGENTS.md) and tests can replace it with a fixed clock.
 */
@Injectable({ providedIn: 'root' })
export class ClockService {
  now(): Date {
    return new Date();
  }
}
