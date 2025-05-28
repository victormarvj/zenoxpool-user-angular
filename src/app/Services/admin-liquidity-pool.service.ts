import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminLiquidityPoolService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/admin`;

  constructor() {}

  getLiquidityPool(id: number) {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<any>(`${this.baseUrl}/liquidity-pool/edit-liquidity-pool/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  editLiquidityPool(formData: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<any>(
        `${this.baseUrl}/liquidity-pool/edit-liquidity-pool`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token?.access_token}`,
          },
        }
      )
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
