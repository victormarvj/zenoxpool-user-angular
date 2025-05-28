import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Users } from '../Interfaces/users';
import {
  catchError,
  Observable,
  ObservedValuesFromArray,
  throwError,
} from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);
  private baseUrl: string = `${environment.apiUrl}/admin`;

  constructor() {}

  getUsers(): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<any>(`${this.baseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  changeStatus(formData: FormData): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<any>(`${this.baseUrl}/users/change-status`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  deleteUser(formData: FormData): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<any>(`${this.baseUrl}/users/delete-user`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  register(formData: any): Observable<Users> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<Users>(`${this.baseUrl}/users/register`, formData, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  getUser(id: number) {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .get<Users>(`${this.baseUrl}/users/edit-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token?.access_token}`,
        },
      })
      .pipe(catchError(this.handleError));
  }

  editUser(formData: any): Observable<Users> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<Users>(`${this.baseUrl}/users/edit-user`, formData, {
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
