import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Users } from '../Interfaces/users';
import { LocalStorageService } from './local-storage.service';
import { LogoutService } from './logout.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/user`;

  private localStorageService = inject(LocalStorageService);

  private authUserSubject = new BehaviorSubject<Users | null>(null);
  authUser$ = this.authUserSubject.asObservable();

  constructor() {}

  setAuthUser(user: Users) {
    this.authUserSubject.next(user);
  }

  clearAuthUser() {
    this.authUserSubject.next(null);
  }

  register(formData: any): Observable<Users> {
    return this.http
      .post<Users>(`${this.baseUrl}/register`, formData)
      .pipe(catchError(this.handleError));
  }

  login(formdata: any | null): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/login`, formdata)
      .pipe(catchError(this.handleError));
  }

  logout(): Observable<any> {
    const token = this.localStorageService.get('zenoxpool');
    return this.http
      .post<any>(
        `${this.baseUrl}/logout`,
        {},
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
