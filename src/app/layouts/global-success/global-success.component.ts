import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { SuccessService } from '../../Services/success.service';

@Component({
  selector: 'app-global-success',
  imports: [FontAwesomeModuleModule],
  templateUrl: './global-success.component.html',
  styleUrl: './global-success.component.scss',
})
export class GlobalSuccessComponent implements OnInit {
  successMessage: string | null = null;

  private successService = inject(SuccessService);

  ngOnInit(): void {
    this.successService.successMessage$.subscribe(
      (msg) => (this.successMessage = msg)
    );
  }

  toggleModal() {
    this.successService.clearSuccess();
  }
}
