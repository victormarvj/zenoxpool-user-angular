import { TestBed } from '@angular/core/testing';

import { UserBankService } from './user-bank.service';

describe('UserBankService', () => {
  let service: UserBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
