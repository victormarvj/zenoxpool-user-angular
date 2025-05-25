import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { UserProfileService } from '../../Services/user-profile.service';
import { LoaderService } from '../../Services/loader.service';
import { ErrorService } from '../../Services/error.service';
import { SuccessService } from '../../Services/success.service';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-profile',
  imports: [
    RouterModule,
    FontAwesomeModuleModule,
    ConfirmationDialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isConfirm: boolean = false;

  passwordMinLength: boolean = false;
  password: string = '';
  imgSrc: string = '';
  imageUrl: string = environment.imageUrl;
  authUser: any;

  private formBuilder = inject(FormBuilder);
  private userProfileService = inject(UserProfileService);
  private loaderService = inject(LoaderService);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private userService = inject(UsersService);

  ngOnInit(): void {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));
    this.getProfile();
  }

  profileForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    email: [''],
    username: [''],
    country: [''],
    state: [''],
    phone: ['', Validators.required],
    image: ['', Validators.required],
  });

  onSubmit() {
    this.toggleLoader(true);
    this.userProfileService.updateProfile(this.profileForm.value).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        this.profileForm.reset();
        this.passwordMinLength = false;
        this.getProfile();
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (this.imgSrc) {
        URL.revokeObjectURL(this.imgSrc);
      }
      this.imgSrc = URL.createObjectURL(file);

      const formData = new FormData();
      formData.append('image', file);
      this.imageUpload(formData);
    }
  }

  imageUpload(formData: FormData) {
    this.toggleLoader(true);
    this.userProfileService.uploadImage(formData).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        this.imgSrc = this.imageUrl + '/' + value.data;
        this.profileForm.patchValue({
          image: value.data,
        });
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  getProfile() {
    this.toggleLoader(true);
    this.userProfileService.getProfile().subscribe({
      next: (res: any) => {
        this.userService.setAuthUser(res.data);
        this.profileForm.patchValue({
          fullname: res.data?.fullname,
          email: res.data?.email,
          username: res.data?.username,
          country: res.data?.country,
          phone: res.data?.phone,
          state: res.data?.state,
          image: res.data?.image,
        });
        this.imgSrc = this.imageUrl + '/' + res.data?.image;
        this.toggleLoader(false);
      },
      error: (err: any) => {
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

  checkPasswordLength() {
    const input = this.profileForm.get('password')?.value || '';
    if (input.length >= 6) {
      this.passwordMinLength = true;
    } else {
      this.passwordMinLength = false;
    }
  }
}
