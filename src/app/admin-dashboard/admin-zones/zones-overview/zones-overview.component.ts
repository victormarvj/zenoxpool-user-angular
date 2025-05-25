import { Component } from '@angular/core';
import { DatatablesModule } from '../../../Modules/datatables/datatables.module';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../Services/users.service';
import { AdminZonesService } from '../../../Services/admin-zones.service';
import { ErrorService } from '../../../Services/error.service';

@Component({
  selector: 'app-zones-overview',
  imports: [
    DatatablesModule,
    FontAwesomeModuleModule,
    NgClass,
    FormsModule,
    ConfirmationDialogComponent,
    RouterModule,
    DatePipe,
  ],
  templateUrl: './zones-overview.component.html',
  styleUrl: './zones-overview.component.scss',
})
export class ZonesOverviewComponent {
  authUser: any;
  zones: any = null;
  isFetching: boolean = false;
  isLoading: boolean = false;
  isConfirm: boolean = false;

  zone_id: number = 0;

  constructor(
    private userService: UsersService,
    private adminZoneService: AdminZonesService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));

    this.getZones();
  }

  getZones() {
    this.isFetching = true;
    this.adminZoneService.getZones().subscribe({
      next: (res) => {
        this.isFetching = false;
        this.zones = res.data.length > 0 ? res.data : null;
      },
      error: (err) => {
        this.isFetching = false;
        this.errorService.setError(err.message);
      },
    });
  }

  changeStatus(id: number) {
    const formData = new FormData();
    formData.append('zone_id', `${id}`);

    this.isLoading = true;
    this.adminZoneService.changeStatus(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.zones = res.data.length > 0 ? res.data : null;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.setError(err.message);
      },
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('zone_id', `${this.zone_id}`);

    this.isConfirm = false;
    this.isLoading = true;
    this.adminZoneService.deleteZone(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.zones = res.data.length > 0 ? res.data : null;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.setError(err.message);
      },
    });
  }

  toggleConfirmModal(id: number) {
    this.isConfirm = !this.isConfirm;
    this.zone_id = id;
  }
}
