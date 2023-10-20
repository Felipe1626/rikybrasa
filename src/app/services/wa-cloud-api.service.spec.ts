import { TestBed } from '@angular/core/testing';

import { WaCloudApiService } from './wa-cloud-api.service';

describe('WaCloudApiService', () => {
  let service: WaCloudApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaCloudApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
