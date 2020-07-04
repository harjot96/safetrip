import { TestBed } from '@angular/core/testing';

import { GeolocationProviderService } from './geolocation-provider.service';

describe('GeolocationProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocationProviderService = TestBed.get(GeolocationProviderService);
    expect(service).toBeTruthy();
  });
});
