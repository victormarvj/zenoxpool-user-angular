import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  Subscription,
  takeWhile,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private countdownSubs: { [key: string]: Subscription } = {};
  private completionSubject = new BehaviorSubject<string>('');

  ngOnDestroy(): void {
    Object.keys(this.countdownSubs).forEach((id) => this.stopCountdown(id));
  }

  startCountdown(durationInDays: number, id: string): Observable<string> {
    this.stopCountdown(id);

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + durationInDays);
    const endTime = endDate.getTime();
    console.log(endTime);

    return timer(0, 1000).pipe(
      map(() => {
        const now = Date.now();
        const distance = endTime - now;

        if (distance <= 0) {
          this.completionSubject.next(id);
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
