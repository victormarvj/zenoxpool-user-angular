import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';

@Component({
  selector: 'app-bank',
  imports: [RouterModule, FontAwesomeModuleModule, DatatablesModule],
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
})
export class BankComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
