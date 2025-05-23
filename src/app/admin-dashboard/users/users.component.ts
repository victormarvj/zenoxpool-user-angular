import { Component, OnInit } from '@angular/core';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { UsersService } from '../../Services/users.service';
import { AdminUsersService } from '../../Services/admin-users.service';
import { ErrorService } from '../../Services/error.service';
import { Users } from '../../Interfaces/users';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../layouts/confirmation-dialog/confirmation-dialog.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {}
