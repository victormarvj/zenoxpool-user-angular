import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderServiceSubject = new BehaviorSubject<boolean>(false);
  loader$ = this.loaderServiceSubject.asObservable();

  constructor() {}

  onLoader(value: boolean) {
    this.loaderServiceSubject.next(value);
  }
}
