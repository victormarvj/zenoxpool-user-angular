import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { NgClass } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from '../../../Services/loader.service';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';
import { UserCryptoService } from '../../../Services/user-crypto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pending-transfer',
  imports: [
    FontAwesomeModuleModule,
    ConfirmationDialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './pending-transfer.component.html',
  styleUrl: './pending-transfer.component.scss',
})
export class PendingTransferComponent implements OnInit {
  isConfirm: boolean = false;

  transactionData: any;

  throttle: number = 3;
  isCorrect: boolean = false;

  transaction_id: any;

  private formBuilder = inject(FormBuilder);
  private userCryptoService = inject(UserCryptoService);
  private loaderService = inject(LoaderService);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.toggleLoader(true);
    this.route.paramMap.subscribe((params) => {
      this.transaction_id = +params.get('id')!;
      this.viewTempTransfer(this.transaction_id);
    });
  }

  viewTempTransfer(transaction_id: number) {
    this.userCryptoService.viewTempTransfer(transaction_id).subscribe({
      next: (res: any) => {
        this.toggleLoader(false);
        this.transactionData = res.data;
        this.transactionForm.patchValue({
          transaction_id: this.transactionData.transaction.id,
        });
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
        this.router.navigate(['/dashboard']);
      },
    });
  }

  transactionForm = this.formBuilder.group({
    transaction_id: ['', Validators.required],
    code: ['', Validators.required],
  });

  checkIsCorrect() {
    const code = this.transactionForm.get('code')?.value;
    if (
      code ==
      this.transactionData.user[
        'code_' + this.transactionData.transaction.no_of_codes
      ]
    ) {
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
  }

  triggerError() {
    this.toggleLoader(true);
    if (this.throttle !== 0) {
      setTimeout(() => {
        this.toggleLoader(false);
        this.throttle -= 1;
        this.errorService.setError(
          'Invalid code. Try again or contact support'
        );
      }, 1000);
    } else {
      this.userCryptoService
        .deleteTempTransfer(this.transactionData.transaction.id)
        .subscribe({
          next: (value: any) => {
            this.toggleLoader(false);
            this.successService.setSuccess(value.message);
            this.router.navigate(['/dashboard/transfer']);
          },
          error: (err: any) => {
            this.toggleLoader(false);
            this.errorService.setError(err.message);
          },
        });
    }
  }

  onSubmit() {
    this.checkIsCorrect();

    if (!this.isCorrect) {
      this.triggerError();
    } else {
      this.toggleLoader(true);
      if (this.transactionData.transaction.no_of_codes !== 1) {
        this.userCryptoService
          .verifyCode(this.transactionForm.value)
          .subscribe({
            next: (value: any) => {
              this.toggleLoader(false);
              this.successService.setSuccess(value.message);
              this.viewTempTransfer(this.transaction_id);
              this.transactionForm.reset();
              this.throttle = 3;
            },
            error: (err: any) => {
              this.toggleLoader(false);
              this.errorService.setError(err.message);
            },
          });
      } else {
        this.userCryptoService
          .processTempTransfer(this.transactionForm.value)
          .subscribe({
            next: (value: any) => {
              this.toggleLoader(false);
              this.successService.setSuccess(value.message);
              this.transactionForm.reset();
              this.router.navigate(['/dashboard/transfer']);
            },
            error: (err: any) => {
              this.toggleLoader(false);
              this.errorService.setError(err.message);
            },
          });
      }
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
}
