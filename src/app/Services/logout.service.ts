import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { SuccessService } from './success.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService,
    private userService: UsersService,
    private router: Router,
    private successService: SuccessService,
    private errorService: ErrorService
  ) {}

  logOut() {
    this.loaderService.onLoader(true);
    const user = this.localStorageService.get('zenoxpool');
    if (!user) {
      this.loaderService.onLoader(false);
      this.userService.clearAuthUser();
      this.router.navigate(['/login']);
    } else {
      this.userService.logout().subscribe({
        next: (res) => {
          this.loaderService.onLoader(false);
          this.localStorageService.remove('zenoxpool');
          this.userService.clearAuthUser();
          this.router.navigate(['/login']);
          this.successService.setSuccess(res.message);
        },
        error: (err) => {
          if (err.status === 401) {
            this.localStorageService.remove('zenoxpool');
            this.userService.clearAuthUser();
            this.router.navigate(['/login']);
          }
          this.loaderService.onLoader(false);
          this.errorService.setError(err.message);
        },
      });
    }
  }
}
