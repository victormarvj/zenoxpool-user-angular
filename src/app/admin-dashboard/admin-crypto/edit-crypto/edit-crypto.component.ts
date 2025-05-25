import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCryptoService } from '../../../Services/admin-crypto.service';
import { LoaderService } from '../../../Services/loader.service';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-edit-crypto',
  imports: [ReactiveFormsModule, ConfirmationDialogComponent],
  templateUrl: './edit-crypto.component.html',
  styleUrl: './edit-crypto.component.scss',
})
export class EditCryptoComponent implements OnInit {
  isConfirm: boolean = false;
  imgSrc: string = '';
  imageUrl: string = environment.imageUrl;

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private adminCryptoService = inject(AdminCryptoService);
  private loaderService = inject(LoaderService);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private router = inject(Router);

  ngOnInit(): void {
    this.toggleLoader(true);
    this.route.paramMap.subscribe((params) => {
      const crypto_id = +params.get('id')!;
      return this.adminCryptoService.getCrypto(crypto_id).subscribe({
        next: (res: any) => {
          this.editCryptoForm.patchValue({
            crypto_id: res.data?.id,
            name: res.data?.name,
            abbreviation: res.data?.abbreviation,
            network: res.data?.network,
            address: res.data?.address,
            value: res.data?.value,
          });
          this.imgSrc = this.imageUrl + '/' + res.data?.image;
          this.toggleLoader(false);
        },
        error: (err: any) => {
          this.toggleLoader(false);
          this.errorService.setError(err.message);
        },
      });
    });
  }

  editCryptoForm = this.formBuilder.group({
    crypto_id: ['', Validators.required],
    name: ['', Validators.required],
    abbreviation: ['', Validators.required],
    network: ['', Validators.required],
    address: ['', Validators.required],
    value: ['', Validators.required],
    image: ['', Validators.required],
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (this.imgSrc) {
        URL.revokeObjectURL(this.imgSrc);
      }
      this.imgSrc = URL.createObjectURL(file);

      const formData = new FormData();
      formData.append('image', file);
      this.imageUpload(formData);
    }
  }

  imageUpload(formData: FormData) {
    this.toggleLoader(true);
    this.adminCryptoService.uploadImage(formData).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        this.imgSrc = this.imageUrl + '/' + value.data;
        this.editCryptoForm.patchValue({
          image: value.data,
        });
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
    });
  }

  onSubmit() {
    this.toggleLoader(true);
    this.adminCryptoService.editCrypto(this.editCryptoForm.value).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        this.editCryptoForm.reset();
        this.router.navigate(['/admin/dashboard/crypto']);
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
