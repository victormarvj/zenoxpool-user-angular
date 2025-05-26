import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminCryptoService } from '../../../Services/admin-crypto.service';
import { LoaderService } from '../../../Services/loader.service';
import { ErrorService } from '../../../Services/error.service';
import { SuccessService } from '../../../Services/success.service';
import { environment } from '../../../../environments/environment';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-edit-crypto',
  imports: [ReactiveFormsModule, ConfirmationDialogComponent],
  templateUrl: './edit-crypto.component.html',
  styleUrl: './edit-crypto.component.scss',
})
export class EditCryptoComponent implements OnInit {
  isConfirm: boolean = false;
  imgSrc1: string = '';
  imgSrc2: string = '';
  imageUrl: string = environment.imageUrl;

  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private adminCryptoService = inject(AdminCryptoService);
  private loaderService = inject(LoaderService);
  private errorService = inject(ErrorService);
  private successService = inject(SuccessService);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const crypto_id = +params.get('id')!;
      this.getCrypto(crypto_id);
    });
  }

  getCrypto(crypto_id: number) {
    this.toggleLoader(true);
    return this.adminCryptoService.getCrypto(crypto_id).subscribe({
      next: (res: any) => {
        this.editCryptoForm.patchValue({
          crypto_id: res.data?.id,
          name: res.data?.name,
          abbreviation: res.data?.abbreviation,
          network: res.data?.network,
          address: res.data?.address,
          value: res.data?.value,
          image: res.data?.image,
          qr_code: res.data?.qr_code,
        });
        this.imgSrc1 = this.imageUrl + '/' + res.data?.image;
        this.imgSrc2 = this.imageUrl + '/' + res.data?.qr_code;
        this.toggleLoader(false);
      },
      error: (err: any) => {
        this.toggleLoader(false);
        this.errorService.setError(err.message);
      },
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
    qr_code: ['', Validators.required],
  });

  onFileSelected(event: Event, field: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];

      const formData = new FormData();
      formData.append('image', file);

      if (field === 1) {
        if (this.imgSrc1) URL.revokeObjectURL(this.imgSrc1);
        this.imgSrc1 = URL.createObjectURL(file);
      } else {
        if (this.imgSrc2) URL.revokeObjectURL(this.imgSrc2);
        this.imgSrc2 = URL.createObjectURL(file);
      }

      this.imageUpload(formData, field);
    }
  }

  imageUpload(formData: FormData, field: number) {
    this.toggleLoader(true);
    this.adminCryptoService.uploadImage(formData).subscribe({
      next: (value: any) => {
        this.toggleLoader(false);
        this.successService.setSuccess(value.message);
        if (field === 1) {
          this.imgSrc1 = this.imageUrl + '/' + value.data;
          this.editCryptoForm.patchValue({
            image: value.data,
          });
        } else {
          this.imgSrc2 = this.imageUrl + '/' + value.data;
          this.editCryptoForm.patchValue({
            qr_code: value.data,
          });
        }
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
