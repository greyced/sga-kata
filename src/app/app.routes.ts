import { Routes } from '@angular/router';
import { Home } from './features/account/home/home';
import { Withdrawal } from './features/account/withdrawal/withdrawal';
import { Deposit } from './features/account/deposit/deposit';
import { Statement } from './features/account/statement/statement';
import { Account } from './features/account/core/account';
import { AccountService } from './features/account/core/account.service';
import { AccountContainer } from './features/account/account-container/account-container';
import { provideHttpClient } from '@angular/common/http';
import { MockAccountService } from './features/account/core/mock-account.service';

export const routes: Routes = [
  {
    path: 'account',
    component: AccountContainer,
    providers: [
      { provide: Account, useClass: MockAccountService },
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
