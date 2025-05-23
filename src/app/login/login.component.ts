import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from '../layouts/confirmation-dialog/confirmation-dialog.component';
import { LoaderService } from '../Services/loader.service';
import { UsersService } from '../Services/users.service';
import { SuccessService } from '../Services/success.service';
import { ErrorService } from '../Services/error.service';
import { LocalStorageService } from '../Services/local-storage.service';
import { Users } from '../Interfaces/users';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, ConfirmationDialogComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  date: number = new Date().getFullYear();

  isConfirm: boolean = false;

  authUser: any;

  private formBuilder = inject(FormBuilder);
  private loaderService = inject(LoaderService);
  private userService = inject(UsersService);
  private successService = inject(SuccessService);
  private errorService = inject(ErrorService);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);

  constructor() {}

  loginForm = this.formBuilder.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  ngOnInit() {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));
    this.getAuthUser();
  }

  getAuthUser() {
    if (this.authUser) {
      if (this.authUser.privilege !== 6) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  onSubmit() {
    this.toggleLoader(true);
    this.userService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.toggleLoader(false);
        this.successService.setSuccess(res.message);
        this.localStorageService.set('zenoxpool', res);
        this.userService.setAuthUser(res.data);
        this.loginForm.reset();
        if (res.data.privilege !== 6) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  toggleConfirmModal() {
    this.isConfirm = !this.isConfirm;
  }

  toggleLoader(value: boolean) {
    if (this.isConfirm === true) {
      this.isConfirm = false;
    }
    this.loaderService.onLoader(value);
  }
}
