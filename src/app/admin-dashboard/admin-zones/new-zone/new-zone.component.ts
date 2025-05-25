import { Component, inject } from '@angular/core';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';
import { AdminZonesService } from '../../../Services/admin-zones.service';
import { LoaderService } from '../../../Services/loader.service';

@Component({
  selector: 'app-new-zone',
  imports: [ConfirmationDialogComponent, ReactiveFormsModule],
  templateUrl: './new-zone.component.html',
  styleUrl: './new-zone.component.scss',
})
export class NewZoneComponent {
  isConfirm: boolean = false;

  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private adminZoneService = inject(AdminZonesService);
  private loaderService = inject(LoaderService);

  constructor() {}

  newZoneForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    duration_1: ['', [Validators.required, Validators.min(1)]],
    roi_1: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    duration_2: ['', [Validators.required, Validators.min(1)]],
    roi_2: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    duration_3: ['', [Validators.required, Validators.min(1)]],
    roi_3: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  onSubmit() {
    this.toggleLoader(true);
    this.adminZoneService.register(this.newZoneForm.value).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        this.newZoneForm.reset();
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
}
