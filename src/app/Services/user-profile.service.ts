import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/user`;

  constructor() {}

  getProfile(): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get(`${this.baseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  uploadImage(formData: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<any>(`${this.baseUrl}/profile/image-upload`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  updateProfile(formData: any): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post(`${this.baseUrl}/profile`, formData, {
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
