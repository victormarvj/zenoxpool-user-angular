import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent {
  isDarkMode: boolean = false;
  isNavbarHidden: boolean = true;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  toggleNav() {
    this.isNavbarHidden = !this.isNavbarHidden;
  }
}
