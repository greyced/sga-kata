import { inject, Injectable } from '@angular/core';
import { Account } from './account';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AccountBalance, AccountStatement } from '../model/account.model';

@Injectable()
export class AccountService implements Account {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = "http://localhost:8080/api/account";

  private readonly balance$$ = new BehaviorSubject<AccountBalance | null>(null);

  readonly balance$ = this.balance$$.asObservable();

  loadBalance(accountId: string): void {
    this.httpClient
      .get<AccountBalance>(`${this.baseUrl}/${accountId}/balance`)
      .subscribe((balance: AccountBalance) => {
        this.balance$$.next(balance);
      });
  }

  refreshBalance(balance: AccountBalance): void {
    this.balance$$.next(balance);
  }

  getStatement$(accountId: string): Observable<AccountStatement> {
      return this.httpClient.get<AccountStatement>(`${this.baseUrl}/${accountId}/statement`);
  }

  deposit(accountId: string, amount: number): Observable<AccountBalance> {
    return this.httpClient
      .post<AccountBalance>(`${this.baseUrl}/${accountId}/deposit`, { amount })
  }

  withdraw(accountId: string, amount: number): Observable<AccountBalance> {
    return this.httpClient
      .post<AccountBalance>(`${this.baseUrl}/${accountId}/withdraw`, { amount })
  }
}
