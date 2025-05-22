import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';

@Component({
  selector: 'app-zone',
  imports: [RouterModule, FontAwesomeModuleModule],
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ZoneComponent implements OnInit {
  ngOnInit() {}
}
