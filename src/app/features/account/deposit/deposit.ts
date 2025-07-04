import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Account } from '../core/account';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { accountId } from '../core/account.const';

@Component({
  selector: 'app-deposit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './deposit.html',
  styleUrl: './deposit.scss',
})
export class Deposit {
  private readonly account = inject(Account);

  private readonly router = inject(Router);

  readonly form = new FormGroup({
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  deposit(): void {
    const amount = this.form.controls.amount.value;

    if (!amount || amount <= 0) {
      return;
    }

    this.account.deposit(accountId, amount).subscribe({
      next: (statement) => {
        console.log('Deposit successful:', statement);
        this.account.refreshBalance(statement);
      },
      error: (error) => {
        console.error('Deposit failed:', error);
      },
      complete: () => {
        this.router.navigate(['./../account']);
      }
    });
  }
}
