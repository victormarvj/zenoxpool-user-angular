import { Component, OnInit } from '@angular/core';
import { DatatablesModule } from '../../../Modules/datatables/datatables.module';

@Component({
  selector: 'app-loop',
  imports: [DatatablesModule],
  templateUrl: './loop.component.html',
  styleUrls: ['./loop.component.scss'],
})
export class LoopComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
