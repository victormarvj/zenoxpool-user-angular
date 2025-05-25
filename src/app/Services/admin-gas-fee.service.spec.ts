import { TestBed } from '@angular/core/testing';

import { AdminGasFeeService } from './admin-gas-fee.service';

describe('AdminGasFeeService', () => {
  let service: AdminGasFeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGasFeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
