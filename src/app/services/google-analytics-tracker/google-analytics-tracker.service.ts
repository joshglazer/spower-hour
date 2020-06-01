import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsTrackerService {
  constructor() {
    // Constructor
  }

  trackPage(page): void {
    // (window as any).gtag('set', 'page', page);
    // (window as any).gtag('event', 'pageview');
    (window as any).gtag('config', environment.gTagId, { page_path: page });
  }

  trackEvent(event): void {
    // TODO: track event
  }
}
