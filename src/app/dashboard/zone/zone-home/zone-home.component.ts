import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';

@Component({
  selector: 'app-zone-home',
  imports: [RouterModule, FontAwesomeModuleModule],
  templateUrl: './zone-home.component.html',
  styleUrls: ['./zone-home.component.scss'],
})
export class ZoneHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
