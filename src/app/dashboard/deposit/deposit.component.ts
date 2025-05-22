import { Component, OnInit } from '@angular/core';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deposit',
  imports: [RouterModule],
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
