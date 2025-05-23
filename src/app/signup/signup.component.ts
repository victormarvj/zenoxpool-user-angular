import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
@Component({
  selector: 'app-signup',
  imports: [RouterModule, ReactiveFormsModule, ConfirmationDialogComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isConfirm: boolean = false;
  date: number = new Date().getFullYear();

  private userService = inject(UsersService);
  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService);

  constructor() {}

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
    this.userService.register(this.signupForm.value).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        this.toggleConfirmModal();
        this.errorService.setError(err.message);
      },
    });
  }

  toggleConfirmModal() {
    this.isConfirm = !this.isConfirm;
  }
}
