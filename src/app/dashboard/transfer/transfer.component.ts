import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-transfer',
  imports: [FontAwesomeModule, ConfirmationDialogComponent],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  isModal: boolean = false;
  isConfirm: boolean = false;

  constructor() {}

  ngOnInit() {}

  toggleModal() {
    this.isModal = !this.isModal;
  }

  toggleConfirmationDialog() {
    this.isConfirm = !this.isConfirm;
  }
}
