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
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdrawal',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
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

    this.account.withdraw(amount).subscribe({
      next: (statement) => {
        this.account.refreshBalance(statement);
        this.router.navigate(['./../account']);
        console.log('withdraw successful:', statement);
      },
      error: (error) => {
         this.router.navigate(['./../account']);
        console.error('withdraw failed:', error);
      },
    });
  }
}
