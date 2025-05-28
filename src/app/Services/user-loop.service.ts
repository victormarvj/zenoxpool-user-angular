import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserLoopService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/user`;

  constructor() {}

  getLoop(id: number): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get(`${this.baseUrl}/loop/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  addCirculation(formData: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/loop/circulate`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  updateStatus(zone_id: string, loop_id: string): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .put(
        `${this.baseUrl}/loop/${zone_id}/${loop_id}/completed`,
        { loop_id: loop_id },
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
