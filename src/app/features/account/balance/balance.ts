import { Component, inject, OnInit } from '@angular/core';
import { Account } from '../core/account';
import { AsyncPipe } from '@angular/common';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-balance',
  imports: [AsyncPipe],
  templateUrl: './balance.html',
  styleUrl: './balance.scss'
})
export class Balance {

  private readonly account = inject(Account);

  readonly balance$ = this.account.balance$.pipe(
    filter(Boolean));

  constructor() {
    this.account.loadBalance('accountId');
  }

}
