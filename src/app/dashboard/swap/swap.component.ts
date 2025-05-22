import { Component, OnInit } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-swap',
  imports: [FontAwesomeModuleModule, ConfirmationDialogComponent],
  templateUrl: './swap.component.html',
  styleUrls: ['./swap.component.scss'],
})
export class SwapComponent implements OnInit {
  isConfirm: boolean = false;

  constructor() {}

  ngOnInit() {}

  toggleConfirmationDialoq() {
    this.isConfirm = !this.isConfirm;
  }
}
