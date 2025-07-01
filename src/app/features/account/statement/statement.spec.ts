import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statement } from './statement';
import { provideZonelessChangeDetection } from '@angular/core';
import { Account } from '../core/account';
import { MockAccountService } from '../core/mock-account.service';

describe('Statement', () => {
  let component: Statement;
  let fixture: ComponentFixture<Statement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statement],
      providers: [provideZonelessChangeDetection(), { provide: Account, useClass: MockAccountService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Statement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('statement transactions are correctly rendered', () => {
      const fixture = TestBed.createComponent(Statement);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelectorAll('li').length).toEqual(2);
    });
});
