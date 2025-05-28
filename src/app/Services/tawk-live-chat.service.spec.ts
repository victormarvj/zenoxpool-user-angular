import { TestBed } from '@angular/core/testing';

import { TawkLiveChatService } from './tawk-live-chat.service';

describe('TawkLiveChatService', () => {
  let service: TawkLiveChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TawkLiveChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
