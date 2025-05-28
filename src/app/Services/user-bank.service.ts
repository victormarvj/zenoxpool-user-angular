import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserBankService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/user`;

  constructor() {}

  fetchBankDetails(): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get(`${this.baseUrl}/bank/details`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  deposit(formData: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/bank/deposit`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error', error);

    return throwError(function () {
      if (error.status === 422 || error.status === 500) {
        return error.error;
      }

      return error;
    });
  }
}
