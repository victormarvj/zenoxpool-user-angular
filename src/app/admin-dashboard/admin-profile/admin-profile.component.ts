import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-profile',
  imports: [RouterModule, FontAwesomeModule, ConfirmationDialogComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss',
})
export class AdminProfileComponent implements OnInit {
  isConfirm: boolean = false;

  constructor() {}

  ngOnInit() {}

  toggleConfirmationDialog() {
    this.isConfirm = !this.isConfirm;
  }
}
