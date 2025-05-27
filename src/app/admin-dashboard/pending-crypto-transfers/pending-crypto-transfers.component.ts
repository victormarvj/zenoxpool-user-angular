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
  selector: 'app-pending-crypto-transfers',
  imports: [
    FontAwesomeModuleModule,
    DatatablesModule,
    DatePipe,
    NgClass,
    FormsModule,
    ConfirmationDialogComponent,
    UpperCasePipe,
  ],
  templateUrl: './pending-crypto-transfers.component.html',
  styleUrl: './pending-crypto-transfers.component.scss',
})
export class PendingCryptoTransfersComponent {
  isFetching: boolean = false;
  pendingTransfersData: any;
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
        this.pendingTransfersData = res.data.filter(
          (trans: any) => trans.status === 0 && trans.type === 2
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
    this.adminTransactionsService.acceptCryptoTransfer(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.getTransactions();
        this.successService.setSuccess('Transaction accepted successfully!');
        this.pendingTransfersData = res.data.length > 0 ? res.data : null;
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
    this.adminTransactionsService.rejectCryptoTransfer(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.getTransactions();
        this.successService.setSuccess('Transaction rejected successfully!');
        this.pendingTransfersData = res.data.length > 0 ? res.data : null;
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
