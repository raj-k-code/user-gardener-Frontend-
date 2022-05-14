import { TestBed } from '@angular/core/testing';

import { GardenerAuthService } from './gardener-auth.service';

describe('GardenerAuthService', () => {
  let service: GardenerAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardenerAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
