// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Store } from '@ngrx/store';

import { RootStoreState, SpotifyApiStoreActions, SpotifyApiStoreSelectors } from '@app/root-store';
import { Observable } from 'rxjs';

// SpotifyApiService is a service that is used to interface directly with the Spotify API
@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  // constants
  ACCESS_TOKEN_KEY = 'access_token';

  // Access Token used for app API calls
  // accessToken: string = null;
  accessToken$: Observable<string>;

  constructor(
    private http: HttpClient,
    private store$: Store<RootStoreState.State>,
  ) {
    this.accessToken$ = this.store$.select(
      SpotifyApiStoreSelectors.selectSpotifyApiAccessToken
    );
  }

  // Save the access token as a state variable in this service,
  // and also save it to the browser's storage in case the page gets reloaded
  setAccessToken(accessToken) {
    // localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    // this.accessToken = accessToken;
    // this.store$.dispatch(new SpotifyApiStoreActions.LoginSuccessAction(accessToken));
  }

  // Load the access token from the browser's storage
  getAccessTokenFromStorage() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  // Load the access token from the service's state
  getAccessToken() {
    return this.accessToken$;
  }

  // Build default headers for Spotify API Calls
  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${this.getAccessToken()}`,
      })
    };
  }

  // Build the Spotify API Connection URL to request all needed permissions and
  // redirect back to the current location after a successful connection
  getConnectUrl(): string {
    const clientID = environment.spotifyClientKey;
    // Remove fragment from current url, in case there's a bad access token attached
    const redirectUri = `${location.href.match(/(^[^#?]*)/)[0]}connect`;
    const scope = 'playlist-read-private user-read-currently-playing user-read-playback-state user-modify-playback-state';
    const connectUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
    return connectUrl;
  }

  // Spotify API call to retrieve profile information
  getProfile() {
    const deviceUrl = 'https://api.spotify.com/v1/me';
    return this.http.get(deviceUrl, this.getHeaders()).toPromise();
  }

  // Spotify API call to retrieve a list of all devices
  getDevices() {
    const deviceUrl = 'https://api.spotify.com/v1/me/player/devices';
    return this.http.get(deviceUrl, this.getHeaders()).toPromise();
  }

  // Spotify API call to retrieve a set an active device
  setDevice(device) {
    const deviceUrl = 'https://api.spotify.com/v1/me/player';
    const deviceData = {
      device_ids: [device.id],
    };
    return this.http.put(deviceUrl, JSON.stringify(deviceData), this.getHeaders()).toPromise();
  }

  // Spotify API call to retrieve a list of all playlists
  getPlaylists() {
    const playlistsUrl = 'https://api.spotify.com/v1/me/playlists';
    return this.http.get(playlistsUrl, this.getHeaders()).toPromise();
  }

  // Spotify API call to play a playlist
  playPlaylist(playlist) {
    const playUrl = 'https://api.spotify.com/v1/me/player/play';
    const playlistData = {
      context_uri: playlist.uri
    };
    return this.http.put(playUrl, JSON.stringify(playlistData), this.getHeaders()).toPromise();
  }

  // Spotify API call to play the next track in a playlist
  playNextTrack() {
    const playNextUrl = 'https://api.spotify.com/v1/me/player/next';
    return this.http.post(playNextUrl, null, this.getHeaders()).toPromise();
  }

  // Spotify API call to retrieve information about the track that is currently playing
  getCurrentlyPlaying() {
    const currentlyPlayingUrl = 'https://api.spotify.com/v1/me/player/currently-playing';
    return this.http.get(currentlyPlayingUrl, this.getHeaders()).toPromise();
  }

  // Spotify API call to stop the currently playing track
  stop() {
    const stopUrl = 'https://api.spotify.com/v1/me/player/pause';
    this.http.put(stopUrl, null, this.getHeaders()).toPromise();
  }

}
