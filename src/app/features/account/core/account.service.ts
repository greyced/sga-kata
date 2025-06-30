import { inject, Injectable } from '@angular/core';
import { Account } from './account';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AccountBalance, AccountStatement } from '../model/account.model';

@Injectable()
export class AccountService implements Account {
  private readonly httpClient = inject(HttpClient);

  private readonly balance$$ = new BehaviorSubject<AccountBalance>({
    amount: 2000,
    currency: 'EUR',
  });

  readonly balance$ = this.balance$$.asObservable();

  loadBalance(): void {
    this.httpClient
      .get<AccountBalance>('/api/account/balance')
      .subscribe((balance) => {
        this.balance$$.next(balance);
      });
  }

  refreshBalance(balance: AccountBalance): void {
    this.balance$$.next(balance);
  }

  statement$ = this.httpClient.get<AccountStatement>('/api/account/statement');

  deposit(amount: number): Observable<AccountBalance> {
    return this.httpClient
      .post<AccountBalance>('/api/account/deposit', { amount })
  }

  withdraw(amount: number): Observable<AccountBalance> {
    return this.httpClient
      .post<AccountBalance>('/api/account/withdraw', { amount })
  }
}
