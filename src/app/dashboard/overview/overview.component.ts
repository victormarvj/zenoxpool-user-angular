import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { ErrorService } from '../../Services/error.service';
import { UserOverviewService } from '../../Services/user-overview.service';
import { LoaderService } from '../../Services/loader.service';
import { UsersService } from '../../Services/users.service';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { environment } from '../../../environments/environment';
import { UserTransactionsService } from '../../Services/user-transactions.service';

@Component({
  selector: 'app-overview',
  imports: [
    RouterModule,
    DatatablesModule,
    FontAwesomeModuleModule,
    DatePipe,
    UpperCasePipe,
    NgClass,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OverviewComponent implements OnInit {
  authUser: any;

  date = new Date();

  overviewData: any;
  transactionsData: any;

  isFetching: boolean = false;

  imgUrl: string = environment.imageUrl;

  private errorService = inject(ErrorService);
  private userOverviewService = inject(UserOverviewService);
  private userTransactionsService = inject(UserTransactionsService);
  private loaderService = inject(LoaderService);

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));
    this.getOverview();
    this.getTransactions();
  }

  getOverview() {
    this.userOverviewService.getOverview().subscribe({
      next: (value: any) => {
        this.overviewData = value.data;
      },
      error: (err: any) => {
        this.errorService.setError(err.message);
      },
    });
  }

  getTransactions() {
    this.isFetching = true;
    this.userTransactionsService.getTransactions().subscribe({
      next: (res) => {
        this.isFetching = false;
        this.transactionsData = res.data.slice(0, 4);
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
