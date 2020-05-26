import { TestBed } from '@angular/core/testing';

import { GoogleAnalyticsTrackerService } from './google-analytics-tracker.service';

describe('GoogleAnalyticsTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleAnalyticsTrackerService = TestBed.get(
      GoogleAnalyticsTrackerService
    );
    expect(service).toBeTruthy();
  });
});
