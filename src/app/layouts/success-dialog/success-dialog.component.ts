import { Component, model, OnInit } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';

@Component({
  selector: 'app-success-dialog',
  imports: [FontAwesomeModuleModule],
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss'],
})
export class SuccessDialogComponent implements OnInit {
  isOpen = model(false);

  constructor() {}

  ngOnInit() {}

  toggleModal() {
    this.isOpen.update((value) => !value);
  }
}
