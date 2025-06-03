import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';
import { AdminUsersService } from '../../../Services/admin-users.service';
import { LoaderService } from '../../../Services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-create-history',
  imports: [ReactiveFormsModule, ConfirmationDialogComponent],
  templateUrl: './create-history.component.html',
  styleUrl: './create-history.component.scss',
})
export class CreateHistoryComponent {
  isConfirm: boolean = false;

  userId: number = 0;

  type: number = 0;

  userData: any;
  cryptosData: any;
  value: number = 0;
  total: number = 0;
  type_amount: any;
  amount: any;

  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private adminUserService = inject(AdminUsersService);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = +params.get('id')!;
      this.getHistoryData(this.userId);
    });
  }

  historyForm = this.formBuilder.group({
    user_id: ['', Validators.required],
    type: ['0', Validators.required],
    abbreviation: ['usdt', Validators.required],
    amount: ['', Validators.required],
    type_amount: ['', Validators.required],
    address: ['', Validators.required],
  });

  onSubmit() {
    this.toggleLoader(true);
    this.adminUserService.createHistory(this.historyForm.value).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        this.historyForm.reset();
        this.getHistoryData(this.userId);
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  getHistoryData(user_id: number) {
    this.toggleLoader(true);
    this.adminUserService.getHistoryData(user_id).subscribe({
      next: (res: any) => {
        this.historyForm.patchValue({
          user_id: res.data?.user.id,
        });
        this.userData = res.data.user;
        this.cryptosData = res.data.cryptos;
        const crypto = this.cryptosData.filter(
          (crypt: any) => crypt.abbreviation === 'usdt'
        );
        this.value = crypto[0].value;
        this.toggleLoader(false);
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  changeType($event: any) {
    const selected = $event.target.value;
    this.type = +selected;
    this.historyForm.patchValue({
      abbreviation: '',
      type_amount: '',
      amount: '',
    });
  }

  changeNetwork($event: any) {
    const selected = $event.target.value;
    const crypto = this.cryptosData.filter(
      (crypt: any) => crypt.abbreviation === selected
    );
    this.value = crypto[0].value;
    this.setValue();
  }

  setValue() {
    this.type_amount = this.historyForm.get('type_amount')?.value;
    this.amount = this.type_amount * this.value;
    this.historyForm.patchValue({
      amount: this.amount,
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
