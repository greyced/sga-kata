import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Withdrawal } from './withdrawal';
import { provideZonelessChangeDetection } from '@angular/core';
import { Account } from '../core/account';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('Withdraw', () => {
  let component: Withdrawal;
  let fixture: ComponentFixture<Withdrawal>;
  let service = {
    withdraw: () => of({}),
    refreshBalance: () => { }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Withdrawal],
      providers: [provideZonelessChangeDetection(), { provide: Account, useValue: service }, provideRouter([])]
    })
      .compileComponents();
    fixture = TestBed.createComponent(Withdrawal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('withdraw method from service havebeen call after withdraw action', () => {
    spyOn(service, 'withdraw').and.returnValue(of({}));
    component.form.get('amount')?.setValue(2000);
    component.withdraw();
    expect(service.withdraw).toHaveBeenCalled();
  });
});
