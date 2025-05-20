import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'datatables.net';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [],
  imports: [CommonModule, DataTablesModule],
  exports: [DataTablesModule],
})
export class DatatablesModule {}
