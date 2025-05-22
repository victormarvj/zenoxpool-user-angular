import { Component, OnInit } from '@angular/core';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';

@Component({
  selector: 'app-users',
  imports: [DatatablesModule, FontAwesomeModuleModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
