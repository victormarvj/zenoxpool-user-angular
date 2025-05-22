import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';

@Component({
  selector: 'app-bitcoin',
  imports: [RouterModule, FontAwesomeModule, DatatablesModule],
  templateUrl: './bitcoin.component.html',
  styleUrls: ['./bitcoin.component.scss'],
})
export class BitcoinComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
