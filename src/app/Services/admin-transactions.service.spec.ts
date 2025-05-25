import { TestBed } from '@angular/core/testing';

import { AdminTransactionsService } from './admin-transactions.service';

describe('AdminTransactionsService', () => {
  let service: AdminTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
