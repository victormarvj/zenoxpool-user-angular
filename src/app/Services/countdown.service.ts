import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  Subject,
  Subscription,
  takeWhile,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private countdownSubs: { [key: string]: Subscription } = {};
  private completionSubject = new Subject<string>(); // changed from BehaviorSubject to avoid initial subscribing until countdown completes

  ngOnDestroy(): void {
    Object.keys(this.countdownSubs).forEach((id) => this.stopCountdown(id));
  }

  startCountdown(
    creationDate: string,
    durationInDays: string,
    id: string
  ): Observable<string> {
    this.stopCountdown(id); // Clear existing countdown if any

    const endDate = new Date(creationDate);
    const days = parseInt(durationInDays, 10); // 🔥 FIXED
    endDate.setDate(endDate.getDate() + days);

    const endTime = endDate.getTime();

    const countdown$ = timer(0, 1000).pipe(
      map(() => {
        const now = Date.now();
        const distance = endTime - now;

        if (distance <= 0) {
          this.completionSubject.next(id);
          this.stopCountdown(id); // Stop this countdown once completed
          return 'Completed';
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return `${this.formatTime(days)}D ${this.formatTime(
          hours
        )}H ${this.formatTime(minutes)}M ${this.formatTime(seconds)}S`;
      }),
      takeWhile(() => Date.now() < endTime, true)
    );

    const sub = countdown$.subscribe(); // Subscribe to start the countdown
    this.countdownSubs[id] = sub; // Save subscription

    return countdown$; // Return observable for display
  }

  get completion$(): Observable<string> {
    return this.completionSubject.asObservable();
  }

  private formatTime(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private stopCountdown(id: string): void {
    if (this.countdownSubs[id]) {
      this.countdownSubs[id].unsubscribe();
      delete this.countdownSubs[id];
    }
  }
}
