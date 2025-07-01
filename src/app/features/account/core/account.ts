import { Observable } from "rxjs";
import { AccountBalance, AccountStatement } from "../model/account.model";

export abstract class Account {

    abstract balance$:  Observable<AccountBalance | null>;
    abstract statement$: Observable<AccountStatement>;
    abstract loadBalance(): void;
    abstract refreshBalance(balance: AccountBalance): void;
    abstract deposit(amount: number): Observable<AccountBalance>;
    abstract withdraw(amount: number): Observable<AccountBalance>;
    
}
