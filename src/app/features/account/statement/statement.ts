import { Component, inject } from '@angular/core';
import { Account } from '../core/account';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { accountId } from '../core/account.const';

@Component({
  selector: 'app-statement',
  imports: [CurrencyPipe, DatePipe, AsyncPipe, MatIcon, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './statement.html',
  styleUrl: './statement.scss'
})
export class Statement {
  private readonly account = inject(Account);

  statement$ = this.account.getStatement$(accountId); 

  print(): void {
   window.print();
  }
}
