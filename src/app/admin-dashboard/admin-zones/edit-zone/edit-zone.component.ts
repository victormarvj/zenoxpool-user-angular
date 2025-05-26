import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';
import { AdminZonesService } from '../../../Services/admin-zones.service';
import { LoaderService } from '../../../Services/loader.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-zone',
  imports: [ConfirmationDialogComponent, ReactiveFormsModule],
  templateUrl: './edit-zone.component.html',
  styleUrl: './edit-zone.component.scss',
})
export class EditZoneComponent {
  isConfirm: boolean = false;
  zoneData: any;

  private formBuilder = inject(FormBuilder);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private adminZoneService = inject(AdminZonesService);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const zone_id = +params.get('id')!;
      this.getZone(zone_id);
    });
  }

  getZone(zone_id: number) {
    this.toggleLoader(true);
    this.adminZoneService.getZone(zone_id).subscribe({
      next: (res: any) => {
        this.editZoneForm.patchValue({
          zone_id: res.data?.id,
          name: res.data?.name,
          description: res.data?.description,
          duration_1: res.data?.duration_1,
          roi_1: res.data?.roi_1,
          duration_2: res.data?.duration_2,
          roi_2: res.data?.roi_2,
          duration_3: res.data?.duration_3,
          roi_3: res.data?.roi_3,
        });
        this.toggleLoader(false);
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  editZoneForm = this.formBuilder.group({
    zone_id: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    duration_1: ['', [Validators.required, Validators.min(1)]],
    roi_1: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    duration_2: ['', [Validators.required, Validators.min(1)]],
    roi_2: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    duration_3: ['', [Validators.required, Validators.min(1)]],
    roi_3: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  onSubmit() {
    this.toggleLoader(true);
    this.adminZoneService.editZone(this.editZoneForm.value).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        this.editZoneForm.reset();
        this.router.navigate(['/admin/dashboard/zones']);
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
