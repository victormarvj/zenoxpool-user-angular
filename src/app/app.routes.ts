import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { ZoneComponent } from './dashboard/zone/zone.component';

export const routes: Routes = [
  {
    path: 'overview',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
        title: 'Overview | ZenoxPool',
      },
      {
        path: 'zone',
        component: ZoneComponent,
        title: 'Zone | ZenoxPool',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
];
