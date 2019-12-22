// Angular
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

// Services
import { GoogleAnalyticsTrackerService } from './services/google-analytics-tracker/google-analytics-tracker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    private googleAnalyticsTrackerService: GoogleAnalyticsTrackerService
  ) {
    this.router.events.subscribe(event => {
     if (event instanceof NavigationEnd) {
       this.googleAnalyticsTrackerService.trackPage(event.urlAfterRedirects);
     }
   });
 }
}
