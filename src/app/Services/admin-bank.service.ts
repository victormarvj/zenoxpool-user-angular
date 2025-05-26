import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Bank } from '../Interfaces/bank';

@Injectable({
  providedIn: 'root',
})
export class AdminBankService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/admin`;

  constructor() {}

  getbanks(): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<any>(`${this.baseUrl}/banks`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  getBank(id: FormData) {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<Bank>(`${this.baseUrl}/banks/edit-bank/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  editBank(formData: any): Observable<Bank> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<Bank>(`${this.baseUrl}/banks/edit-bank`, formData, {
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
