import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminGasFeeService } from '../../Services/admin-gas-fee.service';
import { LoaderService } from '../../Services/loader.service';
import { ErrorService } from '../../Services/error.service';
import { SuccessService } from '../../Services/success.service';

@Component({
  selector: 'app-gas-fee',
  imports: [
    RouterModule,
    FontAwesomeModule,
    ConfirmationDialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './gas-fee.component.html',
  styleUrl: './gas-fee.component.scss',
})
export class GasFeeComponent implements OnInit {
  isConfirm: boolean = false;

  gasfee_id: number = 0;

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private adminGasFeeService = inject(AdminGasFeeService);
  private loaderService = inject(LoaderService);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.gasfee_id = +params.get('id')!;
      return this.getGasFee();
    });
  }

  getGasFee() {
    this.toggleLoader(true);
    this.adminGasFeeService.getGasFee(this.gasfee_id).subscribe({
      next: (res: any) => {
        this.editGasFeeForm.patchValue({
          gasfee_id: res.data?.id || '1',
          amount: res.data?.amount,
        });
        this.toggleLoader(false);
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  editGasFeeForm = this.formBuilder.group({
    gasfee_id: ['', Validators.required],
    amount: ['', Validators.required],
  });

  onSubmit() {
    this.toggleLoader(true);
    this.adminGasFeeService.editGasFee(this.editGasFeeForm.value).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        this.editGasFeeForm.reset();
        this.getGasFee();
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
