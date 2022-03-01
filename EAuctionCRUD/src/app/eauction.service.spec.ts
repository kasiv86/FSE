import { TestBed } from '@angular/core/testing';

import { EAuctionService } from './eauction.service';

describe('eauctionService', () => {
  let service: EAuctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EAuctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
