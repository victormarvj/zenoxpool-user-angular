import { TestBed } from '@angular/core/testing';

import { AdminZonesService } from './admin-zones.service';

describe('AdminZonesService', () => {
  let service: AdminZonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminZonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
