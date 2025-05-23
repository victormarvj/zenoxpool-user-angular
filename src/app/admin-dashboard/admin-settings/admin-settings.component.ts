import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-settings',
  imports: [RouterModule, FontAwesomeModule, ConfirmationDialogComponent],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.scss',
})
export class AdminSettingsComponent implements OnInit {
  isConfirm: boolean = false;
  constructor() {}

  ngOnInit() {}

  toggleConfirmationDialog() {
    this.isConfirm = !this.isConfirm;
  }
}
