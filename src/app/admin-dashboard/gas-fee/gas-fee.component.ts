import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-gas-fee',
  imports: [RouterModule, FontAwesomeModule, ConfirmationDialogComponent],
  templateUrl: './gas-fee.component.html',
  styleUrl: './gas-fee.component.scss',
})
export class GasFeeComponent implements OnInit {
  isConfirm: boolean = false;
  constructor() {}

  ngOnInit() {}

  toggleConfirmationDialog() {
    this.isConfirm = !this.isConfirm;
  }
}
