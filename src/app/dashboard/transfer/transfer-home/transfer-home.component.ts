import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { Router, RouterModule } from '@angular/router';
import { DecimalPipe, NgClass, UpperCasePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';
import { UserCryptoService } from '../../../Services/user-crypto.service';
import { LoaderService } from '../../../Services/loader.service';
import { UserOverviewService } from '../../../Services/user-overview.service';

@Component({
  selector: 'app-transfer-home',
  imports: [
    FontAwesomeModule,
    ConfirmationDialogComponent,
    RouterModule,
    UpperCasePipe,
    DecimalPipe,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './transfer-home.component.html',
  styleUrl: './transfer-home.component.scss',
})
export class TransferHomeComponent {
  cryptoData: any;
  isConfirm: boolean = false;

  isModal: boolean = false;

  imgUrl: string = environment.imageUrl;

  cryptoDetails: any;

  type_amount: any = 0;
  value: any = 0;
  amount: any = 0;

  singleCrypto: any;

  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private userCryptoService = inject(UserCryptoService);
  private loaderService = inject(LoaderService);
  private userOverviewService = inject(UserOverviewService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getOverview();
  }

  transferForm = this.formBuilder.group({
    crypto_id: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0)]],
    type_amount: ['', Validators.required],
    address: ['', Validators.required],
  });

  setValue() {
    this.type_amount = this.transferForm.get('type_amount')?.value;
    this.amount = this.type_amount * this.value;
    this.transferForm.patchValue({
      amount: this.amount,
    });
  }

  getOverview() {
    this.toggleLoader(true);
    this.userOverviewService.getOverview().subscribe({
      next: (res) => {
        this.toggleLoader(false);
        this.cryptoData = res.data;
        if (res.data.tempTransaction) {
          this.router.navigate([
            '/dashboard/transfer/pending-transfer/',
            res.data.tempTransaction.id,
          ]);
        }
      },
      error: (err) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  getCryptoDetails(crypto_id: number) {
    this.toggleLoader(true);
    this.userCryptoService.getCrypto(crypto_id).subscribe({
      next: (res: any) => {
        this.cryptoDetails = res.data;
        this.toggleLoader(false);
        this.toggleModal();
        this.value = this.cryptoDetails.value;
        this.transferForm.patchValue({
          crypto_id: this.cryptoDetails.id,
          amount: '',
          type_amount: '',
        });
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  onSubmit() {
    this.toggleModal();
    this.isConfirm = false;
    this.toggleLoader(true);
    if (this.cryptoData.user.no_of_codes !== 0) {
      this.userCryptoService.tempTransfer(this.transferForm.value).subscribe({
        next: (res: any) => {
          this.errorService.setError(res.message);
          this.transferForm.reset();
          this.router.navigate([
            '/dashboard/transfer/pending-transfer/',
            res.data.id,
          ]);
        },
        error: (err: any) => {
          this.toggleLoader(false);
          this.errorService.setError(err.message);
        },
      });
    } else {
      this.userCryptoService.transfer(this.transferForm.value).subscribe({
        next: (res: any) => {
          this.successService.setSuccess(res.message);
          this.transferForm.reset();
          this.getOverview();
        },
        error: (err: any) => {
          this.toggleLoader(false);
          this.errorService.setError(err.message);
        },
      });
    }
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
