import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminBankService } from '../../../Services/admin-bank.service';
import { LoaderService } from '../../../Services/loader.service';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';

@Component({
  selector: 'app-edit-bank',
  imports: [ReactiveFormsModule, ConfirmationDialogComponent],
  templateUrl: './edit-bank.component.html',
  styleUrl: './edit-bank.component.scss',
})
export class EditBankComponent implements OnInit {
  isConfirm: boolean = false;

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private adminBankService = inject(AdminBankService);
  private loaderService = inject(LoaderService);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private router = inject(Router);

  ngOnInit(): void {
    this.toggleLoader(true);
    this.route.paramMap.subscribe((params) => {
      const bank_id = +params.get('id')!;
      return this.adminBankService.getBank(bank_id).subscribe({
        next: (res: any) => {
          this.editBankForm.patchValue({
            bank_id: res.data?.id,
            bank_name: res.data?.bank_name,
            account_name: res.data?.account_name,
            account_number: res.data?.account_number,
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

  editBankForm = this.formBuilder.group({
    bank_id: ['', Validators.required],
    bank_name: ['', Validators.required],
    account_name: ['', Validators.required],
    account_number: ['', Validators.required],
  });

  onSubmit() {
    this.toggleLoader(true);
    this.adminBankService.editBank(this.editBankForm.value).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        this.editBankForm.reset();
        this.router.navigate(['/admin/dashboard/bank']);
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
