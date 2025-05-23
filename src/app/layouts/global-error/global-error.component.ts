import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { ErrorService } from '../../Services/error.service';

@Component({
  selector: 'app-global-error',
  imports: [FontAwesomeModuleModule],
  templateUrl: './global-error.component.html',
  styleUrl: './global-error.component.scss',
})
export class GlobalErrorComponent implements OnInit {
  errorMessage: string | null = null;

  private errorService = inject(ErrorService);

  ngOnInit(): void {
    this.errorService.errorMessage$.subscribe(
      (msg) => (this.errorMessage = msg)
    );
  }

  toggleModal() {
    this.errorService.clearError();
  }
}
