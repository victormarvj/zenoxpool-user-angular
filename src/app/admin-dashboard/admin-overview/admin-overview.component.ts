import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';

@Component({
  selector: 'app-admin-overview',
  imports: [RouterModule, FontAwesomeModule, DatatablesModule],
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
