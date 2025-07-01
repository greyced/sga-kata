import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { AccountContainer } from './features/account/account-container/account-container';
import { Account } from './features/account/core/account';
import { AccountService } from './features/account/core/account.service';
import { Deposit } from './features/account/deposit/deposit';
import { Home } from './features/account/home/home';
import { Statement } from './features/account/statement/statement';
import { Withdrawal } from './features/account/withdrawal/withdrawal';

export const routes: Routes = [
  {
    path: 'account',
    component: AccountContainer,
    providers: [
      { provide: Account, useClass: AccountService },
      provideHttpClient(),
    ],
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'statement',
        component: Statement,
      },
      {
        path: 'deposit',
        component: Deposit,
      },
      {
        path: 'withdraw',
        component: Withdrawal,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'account',
  },
];
