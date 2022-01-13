import { TestBed } from '@angular/core/testing';

import { FilterRoutingService } from './filter-routing.service';

describe('FilterRoutingService', () => {
  let service: FilterRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
