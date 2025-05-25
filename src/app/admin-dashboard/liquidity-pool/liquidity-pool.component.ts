import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLiquidityPoolService } from '../../Services/admin-liquidity-pool.service';
import { LoaderService } from '../../Services/loader.service';
import { ErrorService } from '../../Services/error.service';
import { SuccessService } from '../../Services/success.service';

@Component({
  selector: 'app-liquidity-pool',
  imports: [
    FontAwesomeModule,
    ConfirmationDialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './liquidity-pool.component.html',
  styleUrl: './liquidity-pool.component.scss',
})
export class LiquidityPoolComponent {
  isConfirm: boolean = false;

  liquiditypool_id: number = 0;

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private adminLiquidityPoolService = inject(AdminLiquidityPoolService);
  private loaderService = inject(LoaderService);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private router = inject(Router);

  ngOnInit(): void {
    this.toggleLoader(true);
    this.route.paramMap.subscribe((params) => {
      this.liquiditypool_id = +params.get('id')!;
      return this.getGasFee();
    });
  }

  getGasFee() {
    this.adminLiquidityPoolService
      .getLiquidityPool(this.liquiditypool_id)
      .subscribe({
        next: (res: any) => {
          this.editLiquidityPoolForm.patchValue({
            liquiditypool_id: res.data?.id || '1',
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

  editLiquidityPoolForm = this.formBuilder.group({
    liquiditypool_id: ['', Validators.required],
    amount: ['', Validators.required],
  });

  onSubmit() {
    this.toggleLoader(true);
    this.adminLiquidityPoolService
      .editLiquidityPool(this.editLiquidityPoolForm.value)
      .subscribe({
        next: (value: any) => {
          this.toggleLoader(false);
          this.successService.setSuccess(value.message);
          this.editLiquidityPoolForm.reset();
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
