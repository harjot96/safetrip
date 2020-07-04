import { TestBed } from '@angular/core/testing';

import { HeremapService } from './heremap.service';

describe('HeremapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeremapService = TestBed.get(HeremapService);
    expect(service).toBeTruthy();
  });
});
