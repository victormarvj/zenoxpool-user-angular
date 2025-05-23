import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor() {}

  setError(
    message = 'Error: There was an error processing this request. Try again!'
  ) {
    this.errorMessageSubject.next(message);
  }

  clearError() {
    this.errorMessageSubject.next(null);
  }
}
