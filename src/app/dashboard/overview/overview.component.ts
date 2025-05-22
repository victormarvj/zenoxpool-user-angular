import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';

@Component({
  selector: 'app-overview',
  imports: [RouterModule, DatatablesModule, FontAwesomeModuleModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OverviewComponent implements OnInit {
  // dtOptions: Config = {};

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    // };
  }
}
