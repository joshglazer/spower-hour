// Angular
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// Services
import { SpotifyApiService } from '../spotify-api/spotify-api.service';

@Injectable({
  providedIn: 'root'
})
export class SpowerHourService {

  private error: HttpErrorResponse;

  constructor(
    private router: Router,
    private spotifyApiService: SpotifyApiService,
  ) { }

  resetSpotifyData() {
    // Stop Funcationality
    this.spotifyApiService.stop();
    this.spotifyApiService.resetCounter(false);

    // Clear Local Storage
    localStorage.removeItem(this.spotifyApiService.ACCESS_TOKEN_KEY);

    // Clear Service Data
    this.spotifyApiService.accessToken = null;
    this.spotifyApiService.profile = null;
    this.spotifyApiService.devices = [];
    this.spotifyApiService.playlists = [];
    this.spotifyApiService.playlistSelected = null;
    this.spotifyApiService.playlistSelected = null;
    this.spotifyApiService.tracks = [];
    this.spotifyApiService.currentTrack = null;
  }

  logout(): void {
    this.resetSpotifyData();
    this.router.navigate(['']);
  }

  setError(error: HttpErrorResponse): void {
    this.error = error;
    this.router.navigate(['/error']);
  }

  getError(): HttpErrorResponse {
    return this.error;
  }

}
