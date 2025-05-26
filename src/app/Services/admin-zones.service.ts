import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Zones } from '../Interfaces/zones';

@Injectable({
  providedIn: 'root',
})
export class AdminZonesService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/admin`;

  constructor() {}

  getZones(): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<any>(`${this.baseUrl}/zones`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  changeStatus(formData: FormData): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<any>(`${this.baseUrl}/zones/change-status`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  deleteZone(formData: FormData): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<any>(`${this.baseUrl}/zones/delete-zone`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  register(formData: any): Observable<Zones> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<Zones>(`${this.baseUrl}/zones/register`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  getZone(id: number) {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<Zones>(`${this.baseUrl}/zones/edit-zone/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  editZone(formData: any): Observable<Zones> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<Zones>(`${this.baseUrl}/zones/edit-zone`, formData, {
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
