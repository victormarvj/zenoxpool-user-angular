import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';
import { UsersService } from '../../Services/users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-overview',
  imports: [RouterModule, FontAwesomeModule, DatatablesModule, DatePipe],
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  authUser: any;

  date = new Date();

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.userService.authUser$.subscribe((user) => (this.authUser = user));
  }
}
