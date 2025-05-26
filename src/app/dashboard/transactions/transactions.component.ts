import { Component, inject } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { ErrorService } from '../../Services/error.service';
import { UserTransactionsService } from '../../Services/user-transactions.service';
import { LoaderService } from '../../Services/loader.service';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-transactions',
  imports: [
    FontAwesomeModuleModule,
    DatatablesModule,
    DatePipe,
    NgClass,
    UpperCasePipe,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  authUser: any;
  isFetching: boolean = false;
  transactionsData: any;

  private errorService = inject(ErrorService);
  private userTransactionsService = inject(UserTransactionsService);
  private loaderService = inject(LoaderService);

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));

    this.getTransactions();
  }

  getTransactions() {
    this.isFetching = true;
    this.userTransactionsService.getTransactions().subscribe({
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
