import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { ZoneComponent } from './dashboard/zone/zone.component';
import { title } from 'process';
import { LoopComponent } from './dashboard/zone/loop/loop.component';
import { ZoneHomeComponent } from './dashboard/zone/zone-home/zone-home.component';
import { DepositComponent } from './dashboard/deposit/deposit.component';
import { DepositHomeComponent } from './dashboard/deposit/deposit-home/deposit-home.component';
import { CryptoComponent } from './dashboard/deposit/crypto/crypto.component';
import { SwapComponent } from './dashboard/swap/swap.component';
import { TransferComponent } from './dashboard/transfer/transfer.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { ProfileComponent } from './dashboard/profile/profile.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: OverviewComponent,
        title: 'Overview | ZenoxPool',
        data: { title: 'Overview | ZenoxPool' },
      },
      {
        path: 'zone',
        component: ZoneComponent,
        children: [
          {
            path: '',
            component: ZoneHomeComponent,
            title: 'ZP Zone | ZenoxPool',
            data: { title: 'ZP Zone | ZenoxPool' },
          },
          {
            path: 'loop',
            component: LoopComponent,
            title: 'ZP Loop | ZenoxPool',
            data: { title: 'ZP Loop | ZenoxPool' },
          },
        ],
      },
      {
        path: 'deposit',
        component: DepositComponent,
        children: [
          {
            path: '',
            component: DepositHomeComponent,
            title: 'Deposit | ZenoxPool',
            data: { title: 'Deposit | ZenoxPool' },
          },
          {
            path: 'crypto',
            component: CryptoComponent,
            title: 'Crypto | ZenoxPool',
            data: { title: 'Crypto | ZenoxPool' },
          },
        ],
      },
      {
        path: 'swap',
        component: SwapComponent,
        title: 'Swap | ZenoxPool',
        data: { title: 'Swap | ZenoxPool' },
      },
      {
        path: 'transfer',
        component: TransferComponent,
        title: 'Transfer | ZenoxPool',
        data: { title: 'Transfer | ZenoxPool' },
      },
      {
        path: 'settings',
        component: SettingsComponent,
        title: 'Settings | ZenoxPool',
        data: { title: 'Settings | ZenoxPool' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile | ZenoxPool',
        data: { title: 'Profile | ZenoxPool' },
      },
    ],
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
