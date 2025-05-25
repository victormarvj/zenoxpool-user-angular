import { TestBed } from '@angular/core/testing';

import { AdminCryptoService } from './admin-crypto.service';

describe('AdminCryptoService', () => {
  let service: AdminCryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
