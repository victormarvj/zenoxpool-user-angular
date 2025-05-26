import { Component, inject } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';
import { DatePipe, NgClass } from '@angular/common';
import { ErrorService } from '../../Services/error.service';
import { AdminTransactionsService } from '../../Services/admin-transactions.service';
import { LoaderService } from '../../Services/loader.service';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-admin-transactions',
  imports: [FontAwesomeModuleModule, DatatablesModule, DatePipe, NgClass],
  templateUrl: './admin-transactions.component.html',
  styleUrl: './admin-transactions.component.scss',
})
export class AdminTransactionsComponent {
  isFetching: boolean = false;
  transactionsData: any;

  private errorService = inject(ErrorService);
  private adminTransactionsService = inject(AdminTransactionsService);
  private loaderService = inject(LoaderService);

  constructor() {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.isFetching = true;
    this.adminTransactionsService.getTransactions().subscribe({
      next: (res) => {
        this.isFetching = false;
        this.transactionsData = res.data;
      },
      error: (err) => {
        this.isFetching = false;
        this.errorService.setError(err.message);
      },
    });
  }

  toggleLoader(value: boolean) {
    this.loaderService.onLoader(value);
  }
}
