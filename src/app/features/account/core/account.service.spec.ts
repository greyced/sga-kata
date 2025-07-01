import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AccountService } from './account.service';
import { accountId } from './account.const';

describe('Account Service', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideZonelessChangeDetection(), provideHttpClient(), AccountService,
      provideHttpClientTesting()]
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('when loadBalance method is fired, corresponding http get request is done', () => {
    service.loadBalance(accountId);
    const apiReq = httpTestingController.expectOne('http://localhost:8080/api/account/accountId/balance');
    expect(apiReq.request.method).toBe("GET", "Invalid request type");
  });

  it('when getStatement method is fired, corresponding http get request is done', () => {
    service.getStatement$(accountId).subscribe();
    const apiReq = httpTestingController.expectOne('http://localhost:8080/api/account/accountId/statement');
    expect(apiReq.request.method).toBe("GET", "Invalid request type");
  });

   it('when deposit method is fired, corresponding http post request is done', () => {
    service.deposit(accountId, 200).subscribe();
    const apiReq = httpTestingController.expectOne('http://localhost:8080/api/account/accountId/deposit');
    expect(apiReq.request.method).toBe("POST", "Invalid request type");
  });

  it('when deposit method is fired, corresponding http post request is done', () => {
    service.withdraw(accountId, 200).subscribe();
    const apiReq = httpTestingController.expectOne('http://localhost:8080/api/account/accountId/withdraw');
    expect(apiReq.request.method).toBe("POST", "Invalid request type");
  });


});
