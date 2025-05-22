import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../../Modules/font-awesome-module/font-awesome-module.module';

@Component({
  selector: 'app-deposit-home',
  imports: [RouterModule, FontAwesomeModuleModule],
  templateUrl: './deposit-home.component.html',
  styleUrls: ['./deposit-home.component.scss'],
})
export class DepositHomeComponent implements OnInit {
  isModal: boolean = false;

  constructor() {}

  ngOnInit() {}

  toggleModal() {
    this.isModal = !this.isModal;
  }
}
