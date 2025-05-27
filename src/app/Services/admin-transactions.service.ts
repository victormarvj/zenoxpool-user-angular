import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminTransactionsService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/admin`;

  constructor() {}

  getTransactions(): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get(`${this.baseUrl}/transactions`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  acceptBankDeposit(formData: FormData): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/transactions/bank-deposit/accept`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  rejectBankDeposit(formData: FormData): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/transactions/bank-deposit/reject`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  acceptCryptoDeposit(formData: FormData): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/transactions/crypto-deposit/accept`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  rejectCryptoDeposit(formData: FormData): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/transactions/crypto-deposit/reject`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  acceptCryptoTransfer(formData: FormData): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/transactions/crypto-transfer/accept`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  rejectCryptoTransfer(formData: FormData): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/transactions/crypto-transfer/reject`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error', error);

    return throwError(function () {
      if (error.status === 422) {
        return error.error;
      }

      return error;
    });
  }
}
