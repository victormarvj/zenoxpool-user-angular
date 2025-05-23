import { Component, inject, input, model, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [RouterModule, FontAwesomeModuleModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  isConfirm = model(false);
  isLoading: boolean = false;

  private loaderService = inject(LoaderService);

  constructor() {}

  ngOnInit() {
    this.loaderService.loader$.subscribe((val) => (this.isLoading = val));
  }

  toggleModal() {
    this.isConfirm.update((value) => !value);
  }

  toggleIsLoading() {
    this.loaderService.onLoader(true);
  }
}
