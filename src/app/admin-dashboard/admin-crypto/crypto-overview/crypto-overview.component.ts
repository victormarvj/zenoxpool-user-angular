import { Component, OnInit } from '@angular/core';
import { DatatablesModule } from '../../../Modules/datatables/datatables.module';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../Services/users.service';
import { ErrorService } from '../../../Services/error.service';
import { DatePipe, NgClass } from '@angular/common';
import { AdminCryptoService } from '../../../Services/admin-crypto.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-crypto-overview',
  imports: [
    RouterModule,
    FontAwesomeModuleModule,
    DatatablesModule,
    NgClass,
    DatePipe,
  ],
  templateUrl: './crypto-overview.component.html',
  styleUrl: './crypto-overview.component.scss',
})
export class CryptoOverviewComponent implements OnInit {
  authUser: any;
  cryptos: any = null;
  isFetching: boolean = false;
  imageUrl = environment.imageUrl;

  constructor(
    private userService: UsersService,
    private adminCryptoServicee: AdminCryptoService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));

    this.getCryptos();
  }

  getCryptos() {
    this.isFetching = true;
    this.adminCryptoServicee.getCryptos().subscribe({
      next: (res) => {
        this.isFetching = false;
        this.cryptos = res.data.length > 0 ? res.data : null;
      },
      error: (err) => {
        this.isFetching = false;
        this.errorService.setError(err.message);
      },
    });
  }
}
