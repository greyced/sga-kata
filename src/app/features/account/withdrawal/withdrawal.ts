import { Component, inject } from '@angular/core';
import { Account } from '../core/account';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { accountId } from '../core/account.const';

@Component({
  selector: 'app-withdrawal',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './withdrawal.html',
  styleUrl: './withdrawal.scss',
})
export class Withdrawal {
  private readonly account = inject(Account);

  private readonly router = inject(Router);

  readonly form = new FormGroup({
    amount: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
  });

  withdraw(): void {
    const amount = this.form.controls.amount.value;

    if (!amount || amount <= 0) {
      return;
    }

    this.account.withdraw(accountId, amount).subscribe({
      next: (statement) => {
        this.account.refreshBalance(statement);
        console.log('withdraw successful:', statement);
      },
      error: (error) => {
        console.error('withdraw failed:', error);
      },
      complete: () => {
        this.router.navigate(['./../account']);
      }
    });
  }
}
