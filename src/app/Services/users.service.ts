import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Users } from '../Interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/user`;

  constructor() {}

  register(formData: any): Observable<Users> {
    return this.http
      .post<Users>(`${this.baseUrl}/register`, formData)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    console.error('API Error', error);
    return throwError(function () {
      if (error.status === 422) {
        return error.error;
      }

      return error;
    });
  }
}
