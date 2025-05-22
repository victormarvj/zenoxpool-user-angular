import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';

@Component({
  selector: 'app-admin-zones',
  imports: [RouterModule, FontAwesomeModule, DatatablesModule],
  templateUrl: './admin-zones.component.html',
  styleUrls: ['./admin-zones.component.scss'],
})
export class AdminZonesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
