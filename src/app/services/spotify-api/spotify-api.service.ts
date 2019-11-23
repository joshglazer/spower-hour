// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import * as queryString from 'query-string';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SpotifyApiService {

  accessToken: string = null;
  devices = [];
  playlists = [];
  playlistSelected = null;
  tracks = [];
  currentTrack = null;
  counter = null;
  counterInterval: number;

  updateMasonryLayout = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  isConnected(): boolean {
    return this.accessToken != null;
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      })
    };
  }

  getConnectUrl(): string {
    const clientID = environment.spotifyClientKey;
    // Remove fragment from current url, in case there's a bad access token attached
    const redirectUri = `${location.href.match(/(^[^#?]*)/)[0]}connect`;
    const scope = 'playlist-read-private user-read-currently-playing user-read-playback-state user-modify-playback-state';
    const connectUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
    return connectUrl;
  }

  processConnect(location): boolean {
    const parsedHash: any = queryString.parse(location.hash);
    if (parsedHash.access_token) {
      this.accessToken = parsedHash.access_token;
      return true;
    } else {
      this.accessToken = null;
      return false;
    }
  }

  getDevices() {
    const deviceUrl = 'https://api.spotify.com/v1/me/player/devices';
    this.http.get(deviceUrl, this.getHeaders()).subscribe((res: any) => {
      this.devices = res.devices;
    });
  }

  setDevice(device) {
    const deviceUrl = 'https://api.spotify.com/v1/me/player';
    const deviceData = {
      device_ids: [device.id],
      play: true,
    };
    this.http.put(deviceUrl, JSON.stringify(deviceData), this.getHeaders()).subscribe((res: any) => {
      console.log(`Device set`);
    });
  }

  getPlaylists() {
    const playlistsUrl = 'https://api.spotify.com/v1/me/playlists';
    this.http.get(playlistsUrl, this.getHeaders()).subscribe((res: any) => {
      this.playlists = res.items;
      this.updateMasonryLayout = true;
    });
  }

  playlistFixBrokenImage(index) {
    console.log(this.playlists[index]);
    this.playlists[index].images = [];
  }

  selectPlaylist(playlist) {
    this.playlistSelected = playlist;
    this.currentTrack = null;
    this.playPlaylist(playlist);
  }

  getPlaylistSelected() {
    return this.playlistSelected;
  }

  playPlaylist(playlist) {
    const playUrl = 'https://api.spotify.com/v1/me/player/play';
    const trackData = {
      context_uri: playlist.uri
    };
    this.http.put(playUrl, JSON.stringify(trackData), this.getHeaders()).subscribe(
      (res: any) => {
        this.resetCounter();
        this.getCurrentlyPlaying();
      },
      (error: any) => {
        if (error.error.error.reason === 'NO_ACTIVE_DEVICE') {
          this.router.navigate(['/devices']);
        }
      }
    );
  }

  playNextTrack() {
    const playNextUrl = 'https://api.spotify.com/v1/me/player/next';
    this.http.post(playNextUrl, null, this.getHeaders()).subscribe((res: any) => {
      this.getCurrentlyPlaying();
    });
  }

  getCurrentlyPlaying() {
    // Spotify takes a bit of time to update
    setTimeout(() => {
      const currentlyPlayingUrl = 'https://api.spotify.com/v1/me/player/currently-playing';
      this.http.get(currentlyPlayingUrl, this.getHeaders()).subscribe((res: any) => {
        this.currentTrack = res;
        console.log('current track', this.currentTrack);
      });
    }, 500);
  }

  resetCounter(): void {
    clearInterval(this.counterInterval);
    this.counter = 11;
    this.counterInterval = window.setInterval(() => { this.counterTick(); }, 1000);
  }

  counterTick(): void {
    if (this.counter <= 0) {
      this.playNextTrack();
      this.resetCounter();
    }
    this.counter--;
  }

  stop() {
    const stopUrl = 'https://api.spotify.com/v1/me/player/pause';
    this.http.put(stopUrl, null, this.getHeaders()).subscribe((res: any) => {
      console.log(res);
    });
  }
}
