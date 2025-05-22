import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { TitleService } from '../Services/title.service';
import { AsyncPipe } from '@angular/common';
import { filter, map } from 'rxjs';
import { FontAwesomeModuleModule } from '../Modules/font-awesome-module/font-awesome-module.module';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, FontAwesomeModuleModule, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit {
  isDarkMode: boolean = false;
  isNavbarHidden: boolean = true;
  isDropdown: boolean = false;

  date: number = new Date().getFullYear();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let current = this.route;
          while (current.firstChild) current = current.firstChild;
          return (
            current.snapshot.data['title']?.split('|')[0].trim() || 'Overview'
          );
        })
      )
      .subscribe((title) => {
        this.titleService.setTitle(title);
      });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  toggleNav() {
    this.isNavbarHidden = !this.isNavbarHidden;
  }

  toggleDropdown() {
    this.isDropdown = !this.isDropdown;
  }
}
