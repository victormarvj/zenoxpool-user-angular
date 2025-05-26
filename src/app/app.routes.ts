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
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './admin-dashboard/users/users.component';
import { AdminOverviewComponent } from './admin-dashboard/admin-overview/admin-overview.component';
import { AdminZonesComponent } from './admin-dashboard/admin-zones/admin-zones.component';
import { BankComponent } from './admin-dashboard/bank/bank.component';
import { TransactionsComponent } from './dashboard/transactions/transactions.component';
import { AdminTransactionsComponent } from './admin-dashboard/admin-transactions/admin-transactions.component';
import { AdminSettingsComponent } from './admin-dashboard/admin-settings/admin-settings.component';
import { AdminProfileComponent } from './admin-dashboard/admin-profile/admin-profile.component';
import { AdminCryptoComponent } from './admin-dashboard/admin-crypto/admin-crypto.component';
import { GasFeeComponent } from './admin-dashboard/gas-fee/gas-fee.component';
import { LiquidityPoolComponent } from './admin-dashboard/liquidity-pool/liquidity-pool.component';
import { PendingCryptoDepositComponent } from './admin-dashboard/pending-crypto-deposit/pending-crypto-deposit.component';
import { PendingBankDepositComponent } from './admin-dashboard/pending-bank-deposit/pending-bank-deposit.component';

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign Up | ZenoxPool',
    data: { title: 'Sign Up | ZenoxPool' },
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login | ZenoxPool',
    data: { title: 'Login | ZenoxPool' },
  },
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
            path: 'loop/:id',
            component: LoopComponent,
            title: 'ZP Action | ZenoxPool',
            data: { title: 'ZP Action | ZenoxPool' },
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
        path: 'transactions',
        component: TransactionsComponent,
        title: 'Transactions | ZenoxPool',
        data: { title: 'Transactions | ZenoxPool' },
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
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: AdminOverviewComponent,
        title: 'Overview | ZenoxPool',
        data: { title: 'Overview | ZenoxPool' },
      },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin-dashboard/users/user-overview/user-overview.component'
              ).then((c) => c.UserOverviewComponent),
            title: 'Users | ZenoxPool',
            data: { title: 'Users | ZenoxPool' },
          },
          {
            path: 'new-user',
            loadComponent: () =>
              import(
                './admin-dashboard/users/new-user/new-user.component'
              ).then((c) => c.NewUserComponent),
            title: 'New User | ZenoxPool',
            data: { title: 'New User | ZenoxPool' },
          },
          {
            path: 'edit-user/:id',
            loadComponent: () =>
              import(
                './admin-dashboard/users/edit-user/edit-user.component'
              ).then((c) => c.EditUserComponent),
            title: 'Edit User | ZenoxPool',
            data: { title: 'Edit User | ZenoxPool' },
          },
        ],
      },
      {
        path: 'zones',
        component: AdminZonesComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin-dashboard/admin-zones/zones-overview/zones-overview.component'
              ).then((c) => c.ZonesOverviewComponent),
            title: 'Zones | ZenoxPool',
            data: { title: 'Zones | ZenoxPool' },
          },
          {
            path: 'new-zone',
            loadComponent: () =>
              import(
                './admin-dashboard/admin-zones/new-zone/new-zone.component'
              ).then((c) => c.NewZoneComponent),
            title: 'New Zone | ZenoxPool',
            data: { title: 'New Zone | ZenoxPool' },
          },
          {
            path: 'edit-zone/:id',
            loadComponent: () =>
              import(
                './admin-dashboard/admin-zones/edit-zone/edit-zone.component'
              ).then((c) => c.EditZoneComponent),
            title: 'Edit Zone | ZenoxPool',
            data: { title: 'Edit Zone | ZenoxPool' },
          },
        ],
      },
      {
        path: 'crypto',
        component: AdminCryptoComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin-dashboard/admin-crypto/crypto-overview/crypto-overview.component'
              ).then((c) => c.CryptoOverviewComponent),
            title: 'Crypto | ZenoxPool',
            data: { title: 'Crypto | ZenoxPool' },
          },
          {
            path: 'edit-crypto/:id',
            loadComponent: () =>
              import(
                './admin-dashboard/admin-crypto/edit-crypto/edit-crypto.component'
              ).then((c) => c.EditCryptoComponent),
            title: 'Crypto | ZenoxPool',
            data: { title: 'Crypto | ZenoxPool' },
          },
        ],
      },
      {
        path: 'bank',
        component: BankComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './admin-dashboard/bank/bank-overview/bank-overview.component'
              ).then((c) => c.BankOverviewComponent),
            title: 'Bank | ZenoxPool',
            data: { title: 'Bank | ZenoxPool' },
          },
          {
            path: 'edit-bank/:id',
            loadComponent: () =>
              import(
                './admin-dashboard/bank/edit-bank/edit-bank.component'
              ).then((c) => c.EditBankComponent),
            title: 'Edit Bank | ZenoxPool',
            data: { title: 'Edit Bank | ZenoxPool' },
          },
        ],
      },
      {
        path: 'liquidity-pool/:id',
        component: LiquidityPoolComponent,
        title: 'Liquidity Pool | ZenoxPool',
        data: { title: 'Liquidity Pool | ZenoxPool' },
      },
      {
        path: 'gas-fee/:id',
        component: GasFeeComponent,
        title: 'Gas Fee | ZenoxPool',
        data: { title: 'Gas Fee | ZenoxPool' },
      },
      {
        path: 'pending-crypto-deposits',
        component: PendingCryptoDepositComponent,
        title: 'Crypto Deposits | ZenoxPool',
        data: { title: 'Pending Deposits | ZenoxPool' },
      },
      {
        path: 'pending-bank-deposits',
        component: PendingBankDepositComponent,
        title: 'Bank Deposits | ZenoxPool',
        data: { title: 'Pending Deposits | ZenoxPool' },
      },
      {
        path: 'transactions',
        component: AdminTransactionsComponent,
        title: 'Transactions | ZenoxPool',
        data: { title: 'Transactions | ZenoxPool' },
      },
      {
        path: 'settings',
        component: AdminSettingsComponent,
        title: 'Settings | ZenoxPool',
        data: { title: 'Settings | ZenoxPool' },
      },
      {
        path: 'profile',
        component: AdminProfileComponent,
        title: 'Profile | ZenoxPool',
        data: { title: 'Profile | ZenoxPool' },
      },
    ],
  },
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full',
  },
];
