import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { ErrorService } from '../../../Services/error.service';
import { UserCryptoService } from '../../../Services/user-crypto.service';
import { LoaderService } from '../../../Services/loader.service';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SuccessService } from '../../../Services/success.service';

@Component({
  selector: 'app-crypto',
  imports: [
    RouterModule,
    FontAwesomeModuleModule,
    ConfirmationDialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
})
export class CryptoComponent implements OnInit {
  authUser: any;
  isFetching: boolean = false;
  cryptoData: any;
  isConfirm: boolean = false;

  isModal: boolean = false;

  imgUrl: string = environment.imageUrl;

  cryptoDetails: any;

  usdValue: any = 0;

  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private userCryptoService = inject(UserCryptoService);
  private loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.getTransactions();
  }

  cryptoDepositForm = this.formBuilder.group({
    abbreviation: ['', Validators.required],
    amount: ['', Validators.required],
    type_amount: ['', Validators.required],
  });

  setValue() {
    this.usdValue =
      +this.cryptoData.get('amount')?.value * +this.cryptoData.value;
  }

  getTransactions() {
    this.toggleLoader(true);
    this.userCryptoService.getCryptos().subscribe({
      next: (res) => {
        this.toggleLoader(false);
        this.cryptoData = res.data;
      },
      error: (err) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  getCryptoDetails(crypto_id: number) {
    const formData = new FormData();
    formData.append('crypto_id', crypto_id.toString());

    this.toggleLoader(true);
    this.userCryptoService.getCrypto(formData).subscribe({
      next: (res: any) => {
        this.cryptoDetails = res.data;
        this.toggleLoader(false);
        this.toggleModal();
        this.cryptoDepositForm.patchValue({
          abbreviation: this.cryptoDetails.abbreviation,
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
    this.userCryptoService.deposit(this.cryptoDepositForm.value).subscribe({
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
