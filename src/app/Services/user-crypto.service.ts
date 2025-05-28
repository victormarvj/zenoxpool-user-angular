import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCryptoService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/user`;

  constructor() {}

  getCryptos(): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get(`${this.baseUrl}/crypto`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  getCrypto(id: number): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get(`${this.baseUrl}/crypto/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  deposit(formData: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/crypto/deposit`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  checkTempTransaction(): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get(`${this.baseUrl}/crypto/temp-transfer`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  viewTempTransfer(id: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get(`${this.baseUrl}/crypto/temp-transfer/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  verifyCode(formData: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/crypto/temp-transfer/verify-code`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  deleteTempTransfer(id: number): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .delete(`${this.baseUrl}/crypto/temp-transfer/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  tempTransfer(formData: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/crypto/temp-transfer`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  processTempTransfer(formData: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/crypto/temp-transfer/process`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  transfer(formData: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/crypto/transfer`, formData, {
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
