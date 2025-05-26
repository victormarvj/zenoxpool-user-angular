import { TestBed } from '@angular/core/testing';

import { UserCryptoService } from './user-crypto.service';

describe('UserCryptoService', () => {
  let service: UserCryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCryptoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
