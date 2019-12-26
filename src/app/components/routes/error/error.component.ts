// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';

// Misc
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  faSync = faSync;
  error: HttpErrorResponse;

  constructor(
    private spowerHourService: SpowerHourService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.error = this.spowerHourService.getError();
    if (!this.error) {
      this.router.navigate(['']);
    }
  }

  getErrorMessage() {
    return this.error.error.error.message;
  }

  getErrorDetails() {
    return JSON.stringify(this.error);
  }

  startOver() {
    this.spowerHourService.resetSpotifyData();
    this.router.navigate(['']);
  }

}
