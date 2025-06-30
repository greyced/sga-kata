import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AccountBalance, AccountStatement, Transaction } from '../model/account.model';
import { Account } from './account';

@Injectable()
export class MockAccountService implements Account {

  private readonly balance$$ = new BehaviorSubject<AccountBalance>({ amount: 2000, currency: 'EUR' });

  fakeTransactions: Array<Transaction> = [{ id: '1', type: 'deposit', amount: 1000, date: new Date(), description: 'Initial deposit' },
    { id: '2', type: 'withdrawal', amount: 500, date: new Date(), description: 'ATM withdrawal' } ];

  readonly balance$ = this.balance$$.asObservable();

  loadBalance(): void {
    this.balance$$.next({ amount: 4000, currency: 'EUR' });
  }

  refreshBalance(balance: AccountBalance): void {
    this.balance$$.next(balance);
  }

  statement$: Observable<AccountStatement> = of({ accountId: '12345', transactions: this.fakeTransactions });

  deposit(amount: number): Observable<AccountBalance> {
   return of({ amount: this.balance$$.value.amount+ amount, currency: this.balance$$.value.currency });
  }

  withdraw(amount: number): Observable<AccountBalance> {
    return of({ amount: this.balance$$.value.amount - amount, currency: this.balance$$.value.currency });
  }
  
}
