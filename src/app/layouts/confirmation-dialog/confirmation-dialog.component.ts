import { Component, input, model, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [RouterModule, FontAwesomeModuleModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  isOpen = model(false);

  constructor() {}

  ngOnInit() {}

  toggleModal() {
    this.isOpen.update((value) => !value);
  }
}
