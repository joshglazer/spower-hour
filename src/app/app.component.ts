// Angular
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// Services
import { GoogleAnalyticsTrackerService } from './services/google-analytics-tracker/google-analytics-tracker.service';
import { SpowerHourService } from './services/spower-hour/spower-hour.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private googleAnalyticsTrackerService: GoogleAnalyticsTrackerService,
    private spowerHourService: SpowerHourService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.googleAnalyticsTrackerService.trackPage(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit() {
    this.spowerHourService.initializeToken();
  }
}
