import { Component, model, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [RouterModule, FontAwesomeModuleModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  isConfirm = model(false);

  constructor() {}

  ngOnInit() {}

  toggleModal() {
    this.isConfirm.update((value) => !value);
  }
}
