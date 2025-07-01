import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountContainer } from './account-container';
import { provideZonelessChangeDetection } from '@angular/core';
import { Account } from '../core/account';
import { MockAccountService } from '../core/mock-account.service';

describe('AccountContainer', () => {
  let component: AccountContainer;
  let fixture: ComponentFixture<AccountContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountContainer],
      providers: [provideZonelessChangeDetection(), { provide: Account, useClass: MockAccountService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
