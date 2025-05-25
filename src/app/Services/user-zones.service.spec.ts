import { TestBed } from '@angular/core/testing';

import { UserZonesService } from './user-zones.service';

describe('UserZonesService', () => {
  let service: UserZonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserZonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
