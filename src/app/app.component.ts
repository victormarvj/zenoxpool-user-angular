import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalErrorComponent } from './layouts/global-error/global-error.component';
import { GlobalSuccessComponent } from './layouts/global-success/global-success.component';
import { LocalStorageService } from './Services/local-storage.service';
import { UsersService } from './Services/users.service';
import { LoaderComponent } from './layouts/loader/loader.component';
import { LogoutService } from './Services/logout.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    GlobalErrorComponent,
    GlobalSuccessComponent,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private localStorageService = inject(LocalStorageService);
  private userService = inject(UsersService);
  private router = inject(Router);
  private logoutService = inject(LogoutService);

  title = 'zenoxpool';
  authUser: any;

  ngOnInit(): void {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));
    this.isAuthenticated();
  }

  isAuthenticated() {
    const user = this.localStorageService.get('zenoxpool');

    if (!user) {
      this.logOut();
      return;
    }

    if (user.data.privilege !== 6) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }

    this.userService.setAuthUser(user.data);
  }

  logOut() {
    this.logoutService.logOut();
  }
}
