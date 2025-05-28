import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCodesService } from '../../../Services/admin-codes.service';
import { LoaderService } from '../../../Services/loader.service';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';

@Component({
  selector: 'app-edit-code',
  imports: [ReactiveFormsModule, ConfirmationDialogComponent],
  templateUrl: './edit-code.component.html',
  styleUrl: './edit-code.component.scss',
})
export class EditCodeComponent {isConfirm: boolean = false;

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private adminCodesService = inject(AdminCodesService);
  private loaderService = inject(LoaderService);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const code_id = +params.get('id')!;
      this.getCode(code_id);
    });
  }

  getCode(code_id: number) {
    this.toggleLoader(true);
    return this.adminCodesService.getCode(code_id).subscribe({
      next: (res: any) => {
        this.editCodeForm.patchValue({
          code_id: res.data?.id,
          name: res.data?.name,
        });
        this.toggleLoader(false);
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  editCodeForm = this.formBuilder.group({
    code_id: ['', Validators.required],
    name: ['', Validators.required],
  });



  onSubmit() {
    this.toggleLoader(true);
    this.adminCodesService.editCode(this.editCodeForm.value).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        this.editCodeForm.reset();
        this.router.navigate(['/admin/dashboard/codes']);
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
