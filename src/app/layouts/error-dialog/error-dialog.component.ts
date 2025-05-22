import { Component, model, OnInit } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';

@Component({
  selector: 'app-error-dialog',
  imports: [FontAwesomeModuleModule],
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent implements OnInit {
  isOpen = model(false);

  constructor() {}

  ngOnInit() {}

  toggleModal() {
    this.isOpen.update((value) => !value);
  }
}
