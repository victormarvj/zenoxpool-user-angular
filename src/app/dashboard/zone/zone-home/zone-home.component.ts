import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { DatatablesModule } from '../../../Modules/datatables/datatables.module';
import { ErrorService } from '../../../Services/error.service';
import { LoaderService } from '../../../Services/loader.service';
import { UsersService } from '../../../Services/users.service';
import { UserZonesService } from '../../../Services/user-zones.service';

@Component({
  selector: 'app-zone-home',
  imports: [RouterModule, FontAwesomeModuleModule, DatatablesModule],
  templateUrl: './zone-home.component.html',
  styleUrls: ['./zone-home.component.scss'],
})
export class ZoneHomeComponent implements OnInit {
  authUser: any;

  zoneData: any;

  isFetching: boolean = false;

  private errorService = inject(ErrorService);
  private userZonesService = inject(UserZonesService);
  private loaderService = inject(LoaderService);

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));
    this.getOverview();
  }

  getOverview() {
    this.isFetching = true;
    this.userZonesService.getZones().subscribe({
      next: (value: any) => {
        this.zoneData = value.data;
        this.isFetching = false;
      },
      error: (err: any) => {
        this.errorService.setError(err.message);
        this.isFetching = false;
      },
    });
  }

  toggleLoader(value: boolean) {
    this.loaderService.onLoader(value);
  }
}
