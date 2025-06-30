import { Component, inject, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-balance',
  imports: [AsyncPipe],
  templateUrl: './balance.html',
  styleUrl: './balance.scss'
})
export class Balance {

  private readonly account = inject(Account);

  readonly amount$ = this.account.balance$.pipe(
    map(balance => `${balance.amount} ${balance.currency}`))

  constructor() {
    this.account.loadBalance();
  }

}
