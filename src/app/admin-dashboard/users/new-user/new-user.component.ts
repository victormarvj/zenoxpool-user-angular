import { Component, inject } from '@angular/core';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';
import { AdminUsersService } from '../../../Services/admin-users.service';
import { LoaderService } from '../../../Services/loader.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-new-user',
  imports: [ConfirmationDialogComponent, ReactiveFormsModule, NgClass],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss',
})
export class NewUserComponent {
  isConfirm: boolean = false;
  passwordMinLength: boolean = false;
  password: string = '';

  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private adminUserService = inject(AdminUsersService);
  private loaderService = inject(LoaderService);

  constructor() {}

  newUserForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.email],
    phone: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
  });

  onSubmit() {
    if (
      this.newUserForm.value.password !==
      this.newUserForm.value.password_confirmation
    ) {
      this.newUserForm.get('password')?.setValue('');
      this.newUserForm.get('password_confirmation')?.setValue('');
      this.toggleConfirmModal();
      this.errorService.setError("Passwords don't match!");
    } else {
      this.toggleLoader(true);
      this.adminUserService.register(this.newUserForm.value).subscribe({
        next: (value: any) => {
          this.toggleLoader(false);
          this.successService.setSuccess(value.message);
          this.newUserForm.reset();
          this.passwordMinLength = false;
        },
        error: (err: any) => {
          this.toggleLoader(false);
          this.errorService.setError(err.message);
        },
      });
    }
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
    const input = this.newUserForm.get('password')?.value || '';
    if (input.length >= 6) {
      this.passwordMinLength = true;
    } else {
      this.passwordMinLength = false;
    }
  }
}
