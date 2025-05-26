import { Component, inject, OnInit } from '@angular/core';
import { DatatablesModule } from '../../../Modules/datatables/datatables.module';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { ErrorService } from '../../../Services/error.service';
import { LoaderService } from '../../../Services/loader.service';
import { UserLoopService } from '../../../Services/user-loop.service';
import { UsersService } from '../../../Services/users.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgClass } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-loop',
  imports: [
    FontAwesomeModuleModule,
    DatatablesModule,
    ConfirmationDialogComponent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './loop.component.html',
  styleUrls: ['./loop.component.scss'],
})
export class LoopComponent implements OnInit {
  authUser: any;
  isConfirm: boolean = false;
  loopData: any;
  total: number = 0;
  percentage: number = 0;
  amount: any;
  roi: any;
  duration: any;
  isFetching: boolean = false;

  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService);
  private userLoopService = inject(UserLoopService);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);

  remainingTimes: { [id: number]: string } = {};
  countdownSubscription!: Subscription;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));

    this.startCountdowns();

    this.toggleLoader(true);
    this.route.paramMap.subscribe((params) => {
      const loop_id = params.get('id')!;
      this.getLoop(loop_id);
    });
  }

  getLoop(loop_id: string) {
    const formData = new FormData();
    formData.append('loop_id', loop_id);
    this.userLoopService.getLoop(formData).subscribe({
      next: (res: any) => {
        this.loopData = res.data;
        this.loopForm.patchValue({
          loop_id: this.loopData.zone.id,
          duration: this.loopData.zone.duration_1,
          roi: this.loopData.zone.roi_1,
        });
        this.toggleLoader(false);

        this.percentage = this.loopData.zone.roi_1;
        this.duration = this.loopData.zone.duration_1;
        this.total = this.calcTotal();
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  loopForm = this.formBuilder.group({
    loop_id: ['', Validators.required],
    duration: [0, Validators.required],
    roi: [0, Validators.required],
    amount: ['', Validators.required],
    total: [0, Validators.required],
  });

  onSubmit() {}

  setDuration(value: number) {
    this.setROI(value);
    this.calcTotal();
    this.updateForm();
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
    this.updateForm();
  }

  updateForm() {
    this.loopForm.patchValue({
      duration: this.duration,
      roi: this.percentage,
      total: this.total,
      amount: this.amount,
    });
  }

  calcTotal() {
    this.amount = this.loopForm.get('amount')?.value ?? 0;
    this.total = (this.percentage / 100) * +this.amount + +this.amount;
    return this.total;
  }

  setMax() {
    this.amount = this.loopData?.user.usdt;
    console.log(this.loopData?.user.usdt);
    this.updateForm();
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

  startCountdowns() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.updateCountdowns();
    });
  }

  updateCountdowns() {
    if (!this.loopData?.circulations) return;

    this.loopData.circulations.forEach((circulation: any) => {
      const startTime = new Date(circulation.created_at).getTime();

      // Extract number of days from string like "4 days"
      const durationMatch = circulation.duration.match(/\d+/); // grabs just the number
      const durationInDays = durationMatch ? parseInt(durationMatch[0], 10) : 0;

      const endTime = startTime + durationInDays * 24 * 60 * 60 * 1000;
      const now = Date.now();
      const diff = endTime - now;

      if (diff <= 0) {
        this.remainingTimes[circulation.id] = '00D 00H 00M 00S';
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        this.remainingTimes[circulation.id] = `${this.pad(days)}D ${this.pad(
          hours
        )}H ${this.pad(minutes)}M ${this.pad(seconds)}S`;
      }
    });
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }
}
