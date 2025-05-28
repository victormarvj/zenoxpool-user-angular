import { Component, OnInit } from '@angular/core';
import { DatatablesModule } from '../../../Modules/datatables/datatables.module';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../../layouts/confirmation-dialog/confirmation-dialog.component';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../../Services/users.service';
import { AdminUsersService } from '../../../Services/admin-users.service';
import { ErrorService } from '../../../Services/error.service';

@Component({
  selector: 'app-user-overview',
  imports: [
    DatatablesModule,
    FontAwesomeModuleModule,
    NgClass,
    FormsModule,
    ConfirmationDialogComponent,
    RouterModule,
    DatePipe,
  ],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss',
})
export class UserOverviewComponent implements OnInit {
  authUser: any;
  users: any = null;
  isFetching: boolean = false;
  isLoading: boolean = false;
  isConfirm: boolean = false;

  codes: any = null;
  user_id: number = 0;

  constructor(
    private userService: UsersService,
    private adminUserService: AdminUsersService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));

    this.getUsers();
  }

  getUsers() {
    this.isFetching = true;
    this.adminUserService.getUsers().subscribe({
      next: (res) => {
        this.isFetching = false;
        this.users = res.data.users.length > 0 ? res.data.users : null;
        this.codes = res.data.codes;
      },
      error: (err) => {
        this.isFetching = false;
        this.errorService.setError(err.message);
      },
    });
  }

  changeStatus(id: number) {
    const formData = new FormData();
    formData.append('user_id', `${id}`);

    this.isLoading = true;
    this.adminUserService.changeStatus(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.users = res.data.length > 0 ? res.data : null;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.setError(err.message);
      },
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('user_id', `${this.user_id}`);

    this.isConfirm = false;
    this.isLoading = true;
    this.adminUserService.deleteUser(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.users = res.data.length > 0 ? res.data : null;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorService.setError(err.message);
      },
    });
  }

  toggleConfirmModal(id: number) {
    this.isConfirm = !this.isConfirm;
    this.user_id = id;
  }
}
