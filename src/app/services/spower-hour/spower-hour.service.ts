// Angular
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';

// Services
import { SpotifyApiService } from '../spotify-api/spotify-api.service';

// Misc.
import * as queryString from 'query-string';

// SpowerHourService is an experience Service used to control the functionality and state
// of the application and interface with the Spotify API Service
@Injectable({
  providedIn: 'root',
})
export class SpowerHourService {
  // State variables for the application

  // Variables to store information returned from the Spotify API
  profile = null;
  devices = [];
  playlists = [];
  playlistSelected = null;
  tracks = [];
  currentTrack = null;

  // Variables to store information related to the counter that controls how long a track plays
  counter = null;
  counterLength = environment.counterLength;
  counterInterval: number;

  // Variables to store errors returned form the Spotify API
  private error: HttpErrorResponse;

  constructor(
    private router: Router,
    private spotifyApiService: SpotifyApiService
  ) {}

  // Check if a user is connected to the Spotify API
  isConnected(): boolean {
    return this.spotifyApiService.accessToken !== null;
  }

  // Reset all state information back to default values
  resetSpotifyData() {
    // Stop Functionality
    this.spotifyApiService.stop();
    this.resetCounter(false);

    // Clear Local Storage
    localStorage.removeItem(this.spotifyApiService.ACCESS_TOKEN_KEY);

    // Clear Service Data
    this.spotifyApiService.accessToken = null;
    this.profile = null;
    this.devices = [];
    this.playlists = [];
    this.playlistSelected = null;
    this.playlistSelected = null;
    this.tracks = [];
    this.currentTrack = null;
  }

  // Redirect the user to the Spotify connection url in order to generate an acces token
  spotifyConnect() {
    window.location.href = this.spotifyApiService.getConnectUrl();
  }

  // Parse the Spotify Access Token out of the URL and initialize the application
  processConnect(location): boolean {
    const parsedHash: any = queryString.parse(location.hash);
    if (parsedHash.access_token) {
      this.initializeSpotifyData(parsedHash.access_token);
      return true;
    } else {
      this.spotifyApiService.accessToken = null;
      return false;
    }
  }

  // If a spotify access token is stored in the browser, attempt to initalize the application with this token
  initializeToken() {
    if (
      this.spotifyApiService.getAccessTokenFromStorage() !== null &&
      this.spotifyApiService.getAccessToken() === null
    ) {
      this.initializeSpotifyData(
        this.spotifyApiService.getAccessTokenFromStorage()
      );
    }
  }

  // Load all relevant information from the Spotify API
  initializeSpotifyData(accessToken) {
    this.spotifyApiService.setAccessToken(accessToken);
    this.loadProfile();
    this.loadDevices();
    this.loadPlaylists();
    return;
  }

  // Retrieve profile information from the Spotify API and store it as a state variable
  loadProfile() {
    this.spotifyApiService.getProfile().then((data) => {
      this.profile = data;
    });
  }

  // Retrieve device list from the Spotify API and store it as a state variable
  loadDevices() {
    this.spotifyApiService.getDevices().then((data: any) => {
      this.devices = data.devices;
    });
  }

  // Set an active device using the Spotify API and then play the selected playlist
  setDevice(device) {
    this.spotifyApiService.setDevice(device).then((data) => {
      // Wait a second due to API lag
      setTimeout(() => this.playPlaylistSelected(), 1000);
    });
  }

  // Retrieve playlist list from the Spotify API and store it as a state variable
  loadPlaylists() {
    this.spotifyApiService.getPlaylists().then((data: any) => {
      this.playlists = data.items;
    });
  }

  // Retrieve currently playing track from the Spotify API and store it as a state variable
  loadCurrentlyPlaying() {
    // Wait 500ms due to API lag
    setTimeout(() => {
      this.spotifyApiService.getCurrentlyPlaying().then((data) => {
        this.currentTrack = data;
      });
    }, 500);
  }

  // Log out the user by resetting all state variables and redirecting the user back to the main page
  logout(): void {
    this.resetSpotifyData();
    this.router.navigate(['']);
  }

  // Handle errors by setting error information as a state variable and load the error page
  setError(error: HttpErrorResponse): void {
    this.error = error;
    this.router.navigate(['/error']);
  }

  // Retrieve error from state
  getError(): HttpErrorResponse {
    return this.error;
  }

  // TODO: Handle this better
  // Fix Broken Images
  playlistFixBrokenImage(index: number): void {
    this.playlists[index].images = [];
  }

  // Select a playlist and perform all actions needed to play the playlist
  selectPlaylist(playlist) {
    this.playlistSelected = playlist;
    this.currentTrack = null;
    this.playPlaylistSelected();
  }

  playPlaylistSelected() {
    this.spotifyApiService
      .playPlaylist(this.playlistSelected)
      .then((data) => {
        this.resetCounter();
        this.loadCurrentlyPlaying();
        this.router.navigate(['/now-playing']);
      })
      .catch((error) => {
        // If the user does not have an active device set, load the devices page so that they can choose one
        if (error.error.error.reason === 'NO_ACTIVE_DEVICE') {
          this.router.navigate(['/devices']);
        }
      });
  }

  // Get the current track from the state
  getCurrentTrack() {
    return this.currentTrack;
  }

  // Set the counter to the default length and begin counting down
  resetCounter(playNext = true): void {
    clearInterval(this.counterInterval);
    if (playNext) {
      this.counter = this.counterLength + 1;
      this.counterInterval = window.setInterval(() => {
        this.counterTick();
      }, 1000);
    }
  }

  // Count down one interval
  // If the counter reaches zero, play the next track and reset the counter back to the default lenth
  counterTick(): void {
    if (this.counter <= 0) {
      this.spotifyApiService.playNextTrack();
      this.loadCurrentlyPlaying();
      this.resetCounter();
    }
    this.counter--;
  }

  // When resetting the counter, it gets set to one more than the default length.
  // This function ensures that it will never show a number larger than the default length.
  getCounter(): number {
    return this.counter > this.counterLength
      ? this.counterLength
      : this.counter;
  }
}
