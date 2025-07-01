import { Component, inject } from '@angular/core';
import { Account } from '../core/account';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-statement',
  imports: [CurrencyPipe, DatePipe, AsyncPipe, MatIcon],
  templateUrl: './statement.html',
  styleUrl: './statement.scss'
})
export class Statement {
  private readonly account = inject(Account);

  statement$ = this.account.getStatement$('accountId'); 

  print(): void {
   window.print();
  }
}
