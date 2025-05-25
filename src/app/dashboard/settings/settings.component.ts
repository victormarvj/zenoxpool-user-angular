import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserSettingsService } from '../../Services/user-settings.service';
import { LoaderService } from '../../Services/loader.service';
import { ErrorService } from '../../Services/error.service';
import { SuccessService } from '../../Services/success.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [
    FontAwesomeModuleModule,
    ConfirmationDialogComponent,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  isConfirm: boolean = false;

  passwordMinLength: boolean = false;
  password: string = '';

  private formBuilder = inject(FormBuilder);
  private userSettingsService = inject(UserSettingsService);
  private loaderService = inject(LoaderService);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);

  ngOnInit(): void {}

  settingsForm = this.formBuilder.group({
    old_password: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
  });

  onSubmit() {
    if (
      this.settingsForm.value.password !==
      this.settingsForm.value.password_confirmation
    ) {
      this.settingsForm.get('password')?.setValue('');
      this.settingsForm.get('password_confirmation')?.setValue('');
      this.toggleConfirmModal();
      this.passwordMinLength = false;
      this.errorService.setError("Passwords don't match!");
    } else {
      this.toggleLoader(true);
      this.userSettingsService
        .changePassword(this.settingsForm.value)
        .subscribe({
          next: (value: any) => {
            this.toggleLoader(false);
            this.successService.setSuccess(value.message);
            this.settingsForm.reset();
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
    const input = this.settingsForm.get('password')?.value || '';
    if (input.length >= 6) {
      this.passwordMinLength = true;
    } else {
      this.passwordMinLength = false;
    }
  }
}
