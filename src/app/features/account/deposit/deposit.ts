import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { Account } from '../core/account';

@Component({
  selector: 'app-deposit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './deposit.html',
  styleUrl: './deposit.scss',
})
export class Deposit {
  private readonly account = inject(Account);

  private readonly router = inject(Router); 

  private readonly activatedRoute = inject(ActivatedRouteSnapshot);

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

    this.account.deposit('accountId', amount).subscribe({
      next: (statement) => {
        console.log('Deposit successful:', statement);
        this.account.refreshBalance(statement);
        this.router.navigate(['./../account']);
      },
      error: (error) => {
        console.error('Deposit failed:', error);
         this.router.navigate(['./../account']);
      },
    });
  }
}
