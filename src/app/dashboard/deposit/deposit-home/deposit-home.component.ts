import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { ErrorService } from '../../../Services/error.service';
import { UserBankService } from '../../../Services/user-bank.service';
import { LoaderService } from '../../../Services/loader.service';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuccessService } from '../../../Services/success.service';

@Component({
  selector: 'app-deposit-home',
  imports: [
    RouterModule,
    FontAwesomeModuleModule,
    ConfirmationDialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './deposit-home.component.html',
  styleUrls: ['./deposit-home.component.scss'],
})
export class DepositHomeComponent implements OnInit {
  isModal: boolean = false;
  isConfirm: boolean = false;

  amount: any = 0;

  bankDetails: any;

  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private userBankService = inject(UserBankService);
  private loaderService = inject(LoaderService);
  private formBuilder = inject(FormBuilder);

  constructor() {}

  ngOnInit() {}

  bankDepositForm = this.formBuilder.group({
    amount: ['', [Validators.required, Validators.min(0)]],
  });

  onSubmit() {
    this.toggleModal();
    this.isConfirm = false;
    this.toggleLoader(true);
    this.userBankService.deposit(this.bankDepositForm.value).subscribe({
      next: (res: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(res.message);
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  setAmount() {
    this.amount = this.bankDepositForm.get('amount')?.value;
  }

  getBankDetails() {
    this.toggleLoader(true);
    this.userBankService.fetchBankDetails().subscribe({
      next: (res: any) => {
        this.bankDetails = res.data;
        this.toggleLoader(false);
        this.toggleModal();
        this.bankDepositForm.patchValue({
          amount: '',
        });
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  toggleModal() {
    this.isModal = !this.isModal;
  }

  toggleLoader(value: boolean) {
    this.loaderService.onLoader(value);
  }

  toggleConfirmModal() {
    if (!this.isConfirm) {
      this.isConfirm = true;
    } else {
      this.isConfirm = false;
      setTimeout(() => {
        this.isConfirm = true;
      }, 300);
    }
  }
}
