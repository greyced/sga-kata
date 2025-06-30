import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Balance } from '../balance/balance';

@Component({
  selector: 'app-account-container',
  imports: [RouterOutlet, Balance],
  templateUrl: './account-container.html',
  styleUrl: './account-container.scss'
})
export class AccountContainer {

}
