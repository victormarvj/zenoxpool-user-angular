import { TestBed } from '@angular/core/testing';

import { UserLoopService } from './user-loop.service';

describe('UserLoopService', () => {
  let service: UserLoopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLoopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
