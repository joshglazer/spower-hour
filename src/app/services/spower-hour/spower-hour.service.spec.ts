import { TestBed } from '@angular/core/testing';

import { SpowerHourService } from './spower-hour.service';

describe('SpowerHourService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpowerHourService = TestBed.get(SpowerHourService);
    expect(service).toBeTruthy();
  });
});
