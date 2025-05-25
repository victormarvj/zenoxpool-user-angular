import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { DatatablesModule } from '../../../Modules/datatables/datatables.module';
import { DatePipe, NgClass } from '@angular/common';
import { UsersService } from '../../../Services/users.service';
import { ErrorService } from '../../../Services/error.service';
import { Bank } from '../../../Interfaces/bank';
import { AdminBankService } from '../../../Services/admin-bank.service';

@Component({
  selector: 'app-bank-overview',
  imports: [
    RouterModule,
    FontAwesomeModuleModule,
    DatatablesModule,
    NgClass,
    DatePipe,
  ],
  templateUrl: './bank-overview.component.html',
  styleUrl: './bank-overview.component.scss',
})
export class BankOverviewComponent {
  authUser: any;
  banks: Bank | any;
  isFetching: boolean = false;

  constructor(
    private userService: UsersService,
    private adminBankService: AdminBankService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));

    this.getBanks();
  }

  getBanks() {
    this.isFetching = true;
    this.adminBankService.getbanks().subscribe({
      next: (res) => {
        this.isFetching = false;
        this.banks = res.data.length > 0 ? res.data : null;
      },
      error: (err) => {
        this.isFetching = false;
        this.errorService.setError(err.message);
      },
    });
  }
}
