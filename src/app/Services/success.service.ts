import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuccessService {
  private successMessageSubject = new BehaviorSubject<string | null>(null);
  successMessage$ = this.successMessageSubject.asObservable();

  constructor() {}

  setSuccess(
    message = 'Transaction completed successfully. Proceed to view your assets'
  ) {
    this.successMessageSubject.next(message);
  }

  clearSuccess() {
    this.successMessageSubject.next(null);
  }
}
