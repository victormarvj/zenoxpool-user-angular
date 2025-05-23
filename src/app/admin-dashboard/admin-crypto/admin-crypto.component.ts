import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModuleModule } from '../../Modules/font-awesome-module/font-awesome-module.module';
import { DatatablesModule } from '../../Modules/datatables/datatables.module';

@Component({
  selector: 'app-admin-crypto',
  imports: [RouterModule, FontAwesomeModuleModule, DatatablesModule],
  templateUrl: './admin-crypto.component.html',
  styleUrl: './admin-crypto.component.scss',
})
export class AdminCryptoComponent {}
