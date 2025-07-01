import { inject, Injectable } from '@angular/core';
import { Account } from './account';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AccountBalance, AccountStatement } from '../model/account.model';

@Injectable()
export class AccountService implements Account {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = "/v1/api/account";

  private readonly balance$$ = new BehaviorSubject<AccountBalance | null>(null);

  readonly balance$ = this.balance$$.asObservable();

  loadBalance(): void {
    this.httpClient
      .get<AccountBalance>(`${this.baseUrl}/balance`)
      .subscribe((balance: AccountBalance) => {
        this.balance$$.next(balance);
      });
  }

  refreshBalance(balance: AccountBalance): void {
    this.balance$$.next(balance);
  }

  statement$ = this.httpClient.get<AccountStatement>(`${this.baseUrl}/statement`);

  deposit(amount: number): Observable<AccountBalance> {
    return this.httpClient
      .post<AccountBalance>(`${this.baseUrl}/deposit`, { amount })
  }

  withdraw(amount: number): Observable<AccountBalance> {
    return this.httpClient
      .post<AccountBalance>(`${this.baseUrl}/withdraw`, { amount })
  }
}
