import { TestBed } from '@angular/core/testing';

import { AdminBankService } from './admin-bank.service';

describe('AdminBankService', () => {
  let service: AdminBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
