import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminCodesService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/admin`;

  constructor() {}

  getCodes(): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<any>(`${this.baseUrl}/codes`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  getCode(id: number) {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<any>(`${this.baseUrl}/codes/edit-code/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  editCode(formData: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<any>(`${this.baseUrl}/codes/edit-code`, formData, {
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
