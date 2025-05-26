import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../Services/users.service';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ErrorService } from '../Services/error.service';
import { ConfirmationDialogComponent } from '../layouts/confirmation-dialog/confirmation-dialog.component';
import { LoaderService } from '../Services/loader.service';
import { SuccessService } from '../Services/success.service';
import { NgClass } from '@angular/common';
import { FontAwesomeModuleModule } from '../Modules/font-awesome-module/font-awesome-module.module';
@Component({
  selector: 'app-signup',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ConfirmationDialogComponent,
    FontAwesomeModuleModule,
    NgClass,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isConfirm: boolean = false;

  date: number = new Date().getFullYear();

  passwordMinLength: boolean = false;
  password: string = '';

  isPassword: boolean = true;

  private userService = inject(UsersService);
  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private loaderService = inject(LoaderService);

  constructor(private router: Router) {}

  signupForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.email],
    phone: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
  });

  ngOnInit() {}

  onSubmit() {
    if (
      this.signupForm.value.password !==
      this.signupForm.value.password_confirmation
    ) {
      this.signupForm.get('password')?.setValue('');
      this.signupForm.get('password_confirmation')?.setValue('');
      this.toggleConfirmModal();
      this.passwordMinLength = false;
      this.errorService.setError("Passwords don't match!");
    } else {
      this.toggleLoader(true);
      this.userService.register(this.signupForm.value).subscribe({
        next: (value: any) => {
          this.toggleLoader(false);
          this.successService.setSuccess(value.message);
          this.router.navigate(['/login']);
          this.signupForm.reset();
          this.passwordMinLength = false;
        },
        error: (err: any) => {
          this.toggleLoader(false);
          this.errorService.setError(err.message);
        },
      });
    }
  }

  togglePassword() {
    this.isPassword = !this.isPassword;
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

  checkPasswordLength() {
    const input = this.signupForm.get('password')?.value || '';
    if (input.length >= 6) {
      this.passwordMinLength = true;
    } else {
      this.passwordMinLength = false;
    }
  }
}
