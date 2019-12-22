// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';

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
    private spotifyApiService: SpotifyApiService
  ) { }

  ngOnInit() {
    this.error = this.spotifyApiService.getError();
  }

  getErrorMessage() {
    return this.error.error.error.message;
  }

  getErrorDetails() {
    return JSON.stringify(this.error);
  }

}
