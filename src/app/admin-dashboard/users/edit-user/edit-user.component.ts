import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';
import { AdminUsersService } from '../../../Services/admin-users.service';
import { LoaderService } from '../../../Services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  imports: [ConfirmationDialogComponent, ReactiveFormsModule, NgClass],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  isConfirm: boolean = false;
  passwordMinLength: boolean = true;
  password: string = '';
  userData: any;

  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private adminUserService = inject(AdminUsersService);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.toggleLoader(true);
    this.route.paramMap.subscribe((params) => {
      const user_id = +params.get('id')!;
      this.adminUserService.getUser(user_id).subscribe({
        next: (res: any) => {
          this.editUserForm.patchValue({
            user_id: res.data?.id,
            fullname: res.data?.fullname,
            username: res.data?.username,
            email: res.data?.email,
            phone: res.data?.phone,
            password: res.data?.pass,
            password_confirmation: res.data?.pass,
          });
          this.toggleLoader(false);
        },
        error: (err: any) => {
          this.toggleLoader(false);
          this.errorService.setError(err.message);
        },
      });
    });
  }

  editUserForm = this.formBuilder.group({
    user_id: ['', Validators.required],
    fullname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.email],
    phone: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
  });

  onSubmit() {
    if (
      this.editUserForm.value.password !==
      this.editUserForm.value.password_confirmation
    ) {
      this.editUserForm.get('password')?.setValue('');
      this.editUserForm.get('password_confirmation')?.setValue('');
      this.toggleConfirmModal();
      this.errorService.setError("Passwords don't match!");
    } else {
      this.toggleLoader(true);
      this.adminUserService.editUser(this.editUserForm.value).subscribe({
        next: (value: any) => {
          this.toggleLoader(false);
          this.successService.setSuccess(value.message);
          this.editUserForm.reset();
          this.passwordMinLength = false;
          this.router.navigate(['/admin/dashboard/users']);
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
    const input = this.editUserForm.get('password')?.value || '';
    if (input.length >= 6) {
      this.passwordMinLength = true;
    } else {
      this.passwordMinLength = false;
    }
  }
}
