import { TestBed } from '@angular/core/testing';

import { AdminLiquidityPoolService } from './admin-liquidity-pool.service';

describe('AdminLiquidityPoolService', () => {
  let service: AdminLiquidityPoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLiquidityPoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
