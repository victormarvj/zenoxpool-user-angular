import { Component, inject } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';
import { ErrorService } from '../../Services/error.service';
import { SuccessService } from '../../Services/success.service';
import { AdminTransactionsService } from '../../Services/admin-transactions.service';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-pending-bank-deposit',
  imports: [
    FontAwesomeModuleModule,
    DatatablesModule,
    DatePipe,
    NgClass,
    FormsModule,
    ConfirmationDialogComponent,
    UpperCasePipe,
  ],
  templateUrl: './pending-bank-deposit.component.html',
  styleUrl: './pending-bank-deposit.component.scss',
})
export class PendingBankDepositComponent {
  isFetching: boolean = false;
  pendingDepositsData: any;
  isAcceptConfirm: boolean = false;
  isRejectConfirm: boolean = false;
  isLoading: boolean = false;

  transaction_id: number = 0;

  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private adminTransactionsService = inject(AdminTransactionsService);
  private loaderService = inject(LoaderService);

  constructor() {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.isFetching = true;
    this.adminTransactionsService.getTransactions().subscribe({
      next: (res) => {
        this.isFetching = false;
        this.pendingDepositsData = res.data.filter(
          (trans: any) => trans.status === 0 && trans.type === 0
        );
      },
      error: (err) => {
        this.isFetching = false;
        this.errorService.setError(err.message);
      },
    });
  }

  onSubmitAccept() {
    const formData = new FormData();
    formData.append('transaction_id', `${this.transaction_id}`);

    this.isAcceptConfirm = false;
    this.isLoading = true;
    this.adminTransactionsService.acceptBankDeposit(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.getTransactions();
        this.successService.setSuccess('Transaction accepted successfully!');
        this.pendingDepositsData = res.data.length > 0 ? res.data : null;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.setError(err.message);
      },
    });
  }

  onSubmitReject() {
    const formData = new FormData();
    formData.append('transaction_id', `${this.transaction_id}`);

    this.isRejectConfirm = false;
    this.isLoading = true;
    this.adminTransactionsService.rejectBankDeposit(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.getTransactions();
        this.successService.setSuccess('Transaction rejected successfully!');
        this.pendingDepositsData = res.data.length > 0 ? res.data : null;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.setError(err.message);
      },
    });
  }

  toggleLoader(value: boolean) {
    this.loaderService.onLoader(value);
  }

  toggleAcceptConfirmModal(id: number) {
    this.isAcceptConfirm = !this.isAcceptConfirm;
    this.transaction_id = id;
  }

  toggleRejectConfirmModal(id: number) {
    this.isRejectConfirm = !this.isRejectConfirm;
    this.transaction_id = id;
  }
}
