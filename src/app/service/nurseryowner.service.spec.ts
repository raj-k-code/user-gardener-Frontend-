import { TestBed } from '@angular/core/testing';

import { NurseryownerService } from './nurseryowner.service';

describe('NurseryownerService', () => {
  let service: NurseryownerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NurseryownerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
