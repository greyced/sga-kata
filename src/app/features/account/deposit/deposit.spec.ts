import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Account } from '../core/account';
import { Deposit } from './deposit';

describe('Deposit', () => {
  let component: Deposit;
  let fixture: ComponentFixture<Deposit>;
  let service = {
    deposit:() => of({}),
    refreshBalance:() => {}
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deposit],
      providers: [provideZonelessChangeDetection(), { provide: Account, useValue: service}, provideRouter([])]
    })
    .compileComponents();
    fixture = TestBed.createComponent(Deposit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('deposit method from service havebeen call after deposit action', () => {
    spyOn(service, 'deposit').and.returnValue(of({}));
    component.form.get('amount')?.setValue(2000);
    component.deposit();
    expect(service.deposit).toHaveBeenCalled();
  });
});
