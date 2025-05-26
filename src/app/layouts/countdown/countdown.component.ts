import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountdownService } from '../../Services/countdown.service';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() status!: number;
  @Input() duration!: string;
  @Input() itemId!: string;
  @Input() creationDate!: string;

  countdownText = '';
  private countdownSub?: Subscription;

  constructor(private countdownService: CountdownService) {}

  ngOnInit(): void {
    if (this.status === 1) {
      this.countdownText = 'Completed';
    } else {
      this.countdownSub = this.countdownService
        .startCountdown(this.creationDate, this.duration, this.itemId)
        .subscribe((text) => (this.countdownText = text));
    }
  }

  ngOnDestroy(): void {
    if (this.countdownSub) {
      this.countdownSub?.unsubscribe();
    }
  }
}
