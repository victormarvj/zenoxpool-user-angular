import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminCryptoService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/admin`;

  constructor() {}

  getCryptos(): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<any>(`${this.baseUrl}/cryptos`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  getCrypto(id: FormData) {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<Crypto>(`${this.baseUrl}/cryptos/edit-crypto/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  editCrypto(formData: any): Observable<Crypto> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<Crypto>(`${this.baseUrl}/cryptos/edit-crypto`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  uploadImage(formData: any): Observable<Crypto> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<Crypto>(`${this.baseUrl}/cryptos/image-upload`, formData, {
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
