import { Component, OnInit } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-profile',
  imports: [FontAwesomeModuleModule, ConfirmationDialogComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isConfirm: boolean = false;

  constructor() {}

  ngOnInit() {}

  toggleConfirmationDialog() {
    this.isConfirm = !this.isConfirm;
  }
}
