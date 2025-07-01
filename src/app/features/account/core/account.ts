import { Observable } from "rxjs";
import { AccountBalance, AccountStatement } from "../model/account.model";

export abstract class Account {

    abstract balance$:  Observable<AccountBalance | null>;
    abstract statement$: Observable<AccountStatement>;
    abstract loadBalance(accountId: string): void;
    abstract refreshBalance(balance: AccountBalance): void;
    abstract deposit(accountId: string, amount: number): Observable<AccountBalance>;
    abstract withdraw(accountId: string, amount: number): Observable<AccountBalance>;
    
}
