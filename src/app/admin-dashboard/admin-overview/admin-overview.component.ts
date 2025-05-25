import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';
import { UsersService } from '../../Services/users.service';
import { DatePipe } from '@angular/common';
import { AdminOverviewService } from '../../Services/admin-overview.service';
import { ErrorService } from '../../Services/error.service';
import { LoaderService } from '../../Services/loader.service';

@Component({
  selector: 'app-admin-overview',
  imports: [RouterModule, FontAwesomeModule, DatatablesModule, DatePipe],
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  authUser: any;

  date = new Date();

  overviewData: any;

  private errorService = inject(ErrorService);
  private adminOverviewService = inject(AdminOverviewService);
  private loaderService = inject(LoaderService);

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));
    this.getOverview();
  }

  getOverview() {
    this.adminOverviewService.getOverview().subscribe({
      next: (value: any) => {
        this.overviewData = value.data;
      },
      error: (err: any) => {
        this.errorService.setError(err.message);
      },
    });
  }

  toggleLoader(value: boolean) {
    this.loaderService.onLoader(value);
  }
}
