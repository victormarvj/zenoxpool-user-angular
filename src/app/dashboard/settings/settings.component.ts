import { Component, OnInit } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-settings',
  imports: [FontAwesomeModuleModule, ConfirmationDialogComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  isConfirm: boolean = false;
  constructor() {}

  ngOnInit() {}

  toggleConfirmationDialog() {
    this.isConfirm = !this.isConfirm;
  }
}
