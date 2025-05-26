import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DatatablesModule } from '../../../Modules/datatables/datatables.module';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { ErrorService } from '../../../Services/error.service';
import { LoaderService } from '../../../Services/loader.service';
import { UserLoopService } from '../../../Services/user-loop.service';
import { UsersService } from '../../../Services/users.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DecimalPipe, NgClass } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { SuccessService } from '../../../Services/success.service';
import { CountdownService } from '../../../Services/countdown.service';
import { CountdownComponent } from '../../../layouts/countdown/countdown.component';

@Component({
  selector: 'app-loop',
  imports: [
    FontAwesomeModuleModule,
    DatatablesModule,
    ConfirmationDialogComponent,
    ReactiveFormsModule,
    NgClass,
    DecimalPipe,
    CountdownComponent,
  ],
  templateUrl: './loop.component.html',
  styleUrls: ['./loop.component.scss'],
})
export class LoopComponent implements OnInit, OnDestroy {
  authUser: any;
  isConfirm: boolean = false;
  loopData: any;
  total: any = 0;
  percentage: number = 0;
  amount: any = 0;
  roi: any;
  duration: any;
  isFetching: boolean = false;

  zone_id: any;

  private subs = new Subscription();

  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private userLoopService = inject(UserLoopService);
  private countdownService = inject(CountdownService);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.paramMap.subscribe((params) => {
        this.zone_id = +params.get('id')!;
        this.getLoop(this.zone_id);
      })
    );

    this.subs.add(
      this.userService.authUser$.subscribe((user) => (this.authUser = user))
    );

    this.subs.add(
      this.countdownService.completion$.subscribe((completedId: string) => {
        this.updateItemStatus(this.zone_id, completedId);
      })
    );
  }

  getLoop(zone_id: number) {
    this.toggleLoader(true);
    this.userLoopService.getLoop(zone_id).subscribe({
      next: (res: any) => {
        this.loopData = res.data;
        this.loopForm.patchValue({
          zone_id: this.loopData.zone.id,
          duration: this.loopData.zone.duration_1,
        });
        this.toggleLoader(false);
        this.percentage = this.loopData.zone.roi_1;
        this.duration = this.loopData.zone.duration_1;
        this.calcTotal();
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  reGetLoop(zone_id: number) {
    this.userLoopService.getLoop(zone_id).subscribe({
      next: (res: any) => {
        this.loopData = res.data;
        this.loopForm.patchValue({
          zone_id: this.loopData.zone.id,
          duration: this.loopData.zone.duration_1,
        });
        this.percentage = this.loopData.zone.roi_1;
        this.duration = this.loopData.zone.duration_1;
        this.calcTotal();
        this.loopForm.reset();
      },
      error: (err: any) => {
        this.errorService.setError(err.message);
      },
    });
  }

  private updateItemStatus(zone_id: string, loop_id: string): void {
    this.userLoopService.updateStatus(zone_id, loop_id).subscribe({
      next: () => {
        // Refresh data after short delay to account for API processing
        setTimeout(() => this.reGetLoop(this.zone_id), 500);
      },
      error: (err) => console.error('Failed to update status:', err),
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loopForm = this.formBuilder.group({
    zone_id: ['', Validators.required],
    duration: [''],
    amount: ['', Validators.required],
    total: [0, Validators.required],
  });

  onSubmit() {
    this.toggleLoader(true);
    this.userLoopService.addCirculation(this.loopForm.value).subscribe({
      next: (res: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess('Circulation started successfully!');
        this.loopForm.reset();
        console.log(this.loopData);
        this.getLoop(res.data.zone.id);
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  setDuration(value: number) {
    this.duration = value;
    this.setROI(value);
    this.calcTotal();
    this.loopForm.patchValue({
      duration: this.duration,
    });
  }

  setROI(value: number) {
    const zone = this.loopData.zone;

    for (let i = 1; i <= 3; i++) {
      if (zone[`duration_${i}`] === value) {
        this.percentage = zone[`roi_${i}`];
        return this.percentage;
      }
    }

    return null;
  }

  setTotal() {
    this.calcTotal();
  }

  calcTotal() {
    this.amount = this.loopForm.get('amount')?.value;
    this.total = (this.percentage / 100) * +this.amount + +this.amount;
    this.loopForm.patchValue({
      total: this.total,
    });
  }

  setMax() {
    this.amount = this.loopData?.user.usdt - this.loopData.gasFee;
    this.total = (this.percentage / 100) * +this.amount + +this.amount;
    this.loopForm.patchValue({
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
    this.isFetching = true;
    if (this.loopData?.circulations) {
      this.isFetching = false;
    }
  }
}
