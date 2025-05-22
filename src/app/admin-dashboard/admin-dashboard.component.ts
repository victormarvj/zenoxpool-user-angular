import { Component, HostListener, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { FontAwesomeModuleModule } from '../Modules/font-awesome-module/font-awesome-module.module';
import { TitleService } from '../Services/title.service';
import { filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule, FontAwesomeModuleModule, AsyncPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  isDarkMode: boolean = false;
  isNavbarHidden: boolean = true;
  isDropdown: boolean = false;
  isMobile: boolean = false;

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
    if (this.isMobile) {
      this.isNavbarHidden = !this.isNavbarHidden;
    }
  }

  toggleDropdown() {
    this.isDropdown = !this.isDropdown;
  }

  @HostListener('window:resize') onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 900;
  }
}
