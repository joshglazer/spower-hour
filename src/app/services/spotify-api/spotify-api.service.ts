import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as queryString from 'query-string';

import { environment } from '../../../environments/environment';

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

  updateMasonryLayout = false;

  constructor(private http: HttpClient) { }

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
      console.log(this.devices);
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
      console.log(this.playlists);
      this.updateMasonryLayout = true;
    });
  }

  selectPlaylist(playlist) {
    this.playlistSelected = playlist;
    this.playPlaylist(playlist);
  }

  hasPlaylistSelected() {
    return this.playlistSelected !== null;
  }

  playPlaylist(playlist) {
    const playUrl = 'https://api.spotify.com/v1/me/player/play';
    const trackData = {
      context_uri: playlist.uri
    };
    this.http.put(playUrl, JSON.stringify(trackData), this.getHeaders()).subscribe((res: any) => {
      console.log(res);
      this.getCurrentlyPlaying();
    });
  }

  playNextTrack() {
    const playNextUrl = 'https://api.spotify.com/v1/me/player/next';
    this.http.post(playNextUrl, null, this.getHeaders()).subscribe((res: any) => {
      console.log(res);
      this.getCurrentlyPlaying();
    });
  }

  getCurrentlyPlaying() {
    // Spotify takes a bit of time to update
    setTimeout(() => {
      const currentlyPlayingUrl = 'https://api.spotify.com/v1/me/player/currently-playing';
      this.http.get(currentlyPlayingUrl, this.getHeaders()).subscribe((res: any) => {
        console.log(res);
        this.currentTrack = res;
      });
    }, 500);
  }

  stop() {
    const stopUrl = 'https://api.spotify.com/v1/me/player/pause';
    this.http.put(stopUrl, null, this.getHeaders()).subscribe((res: any) => {
      console.log(res);
    });
  }
}
