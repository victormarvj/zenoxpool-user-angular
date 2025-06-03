import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';
import { AdminUsersService } from '../../../Services/admin-users.service';
import { LoaderService } from '../../../Services/loader.service';
import { NgClass } from '@angular/common';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-balance',
  imports: [RouterModule, ReactiveFormsModule, ConfirmationDialogComponent],
  templateUrl: './edit-balance.component.html',
  styleUrl: './edit-balance.component.scss',
})
export class EditBalanceComponent implements OnInit {
  isConfirm: boolean = false;

  userId: number = 0;

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
      this.getUser(this.userId);
    });
  }

  balanceForm = this.formBuilder.group({
    user_id: ['', Validators.required],
    btc: ['', Validators.required],
    usdt: ['', Validators.required],
    eth: ['', Validators.required],
    bnb: ['', Validators.required],
  });

  onSubmit() {
    this.toggleLoader(true);
    this.adminUserService.editUserBalance(this.balanceForm.value).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        this.balanceForm.reset();
        this.getUser(this.userId);
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  getUser(user_id: number) {
    this.toggleLoader(true);
    this.adminUserService.getUser(user_id).subscribe({
      next: (res: any) => {
        this.balanceForm.patchValue({
          user_id: res.data?.id,
          btc: res.data?.btc,
          usdt: res.data?.usdt,
          eth: res.data?.eth,
          bnb: res.data?.bnb,
        });
        this.toggleLoader(false);
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
