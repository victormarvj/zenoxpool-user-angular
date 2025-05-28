import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorService } from '../../Services/error.service';
import { SuccessService } from '../../Services/success.service';
import { UserCryptoService } from '../../Services/user-crypto.service';
import { LoaderService } from '../../Services/loader.service';
import { DecimalPipe, NgClass, UpperCasePipe } from '@angular/common';
import { UserOverviewService } from '../../Services/user-overview.service';

@Component({
  selector: 'app-transfer',
  imports: [RouterModule],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent {}
