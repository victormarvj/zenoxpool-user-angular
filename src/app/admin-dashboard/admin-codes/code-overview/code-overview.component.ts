import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { DatatablesModule } from '../../../Modules/datatables/datatables.module';
import { DatePipe, NgClass } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { UsersService } from '../../../Services/users.service';
import { ErrorService } from '../../../Services/error.service';
import { AdminCodesService } from '../../../Services/admin-codes.service';

@Component({
  selector: 'app-code-overview',
  imports: [RouterModule, FontAwesomeModuleModule, DatatablesModule, DatePipe],
  templateUrl: './code-overview.component.html',
  styleUrl: './code-overview.component.scss',
})
export class CodeOverviewComponent {
  authUser: any;
  codes: any = null;
  isFetching: boolean = false;
  imageUrl = environment.imageUrl;

  constructor(
    private userService: UsersService,
    private adminCodesService: AdminCodesService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));

    this.getCodes();
  }

  getCodes() {
    this.isFetching = true;
    this.adminCodesService.getCodes().subscribe({
      next: (res) => {
        this.isFetching = false;
        this.codes = res.data.length > 0 ? res.data : null;
      },
      error: (err) => {
        this.isFetching = false;
        this.errorService.setError(err.message);
      },
    });
  }
}
