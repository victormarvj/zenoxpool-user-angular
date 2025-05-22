import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-crypto',
  imports: [RouterModule, FontAwesomeModuleModule, ConfirmationDialogComponent],
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
})
export class CryptoComponent implements OnInit {
  isModal: boolean = false;
  isConfirm = signal(false);

  constructor() {}

  ngOnInit() {}

  toggleModal() {
    this.isModal = !this.isModal;
  }

  toggleConfirmationDialog() {
    this.isConfirm.update((value) => !value);
  }
}
