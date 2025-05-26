import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { GasFee } from '../Interfaces/gas-fee';

@Injectable({
  providedIn: 'root',
})
export class AdminGasFeeService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/admin`;

  constructor() {}

  // getGasFees(): Observable<any> {
  //   const token = this.localStorageService.get('zenoxpool');
  //   return this.http
  //     .get<any>(`${this.baseUrl}/gas-fee`, {
  //       headers: {
  //         Authorization: `Bearer ${token?.access_token}`,
  //       },
  //     })
  //     .pipe(catchError(this.handleError));
  // }

  getGasFee(id: number) {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<GasFee>(`${this.baseUrl}/gas-fee/edit-gas-fee/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  editGasFee(formData: any): Observable<GasFee> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<GasFee>(`${this.baseUrl}/gas-fee/edit-gas-fee`, formData, {
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
