import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalErrorComponent } from './layouts/global-error/global-error.component';
import { GlobalSuccessComponent } from './layouts/global-success/global-success.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalErrorComponent, GlobalSuccessComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'zenoxpool';
}
