import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Account } from '../core/account';
import { MockAccountService } from '../core/mock-account.service';
import { Balance } from './balance';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Balance', () => {
  let component: Balance;
  let fixture: ComponentFixture<Balance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Balance],
      providers: [{ provide: Account, useClass: MockAccountService }, provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Balance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('balance is correctly rendered', () => {
    const fixture = TestBed.createComponent(Balance);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('4000 EUR');
  });
});
