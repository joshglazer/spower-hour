import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import * as queryString from 'query-string';

import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {

  private accessToken: string = null;
  private playlists = [];

  constructor(private http: HttpClient) { }

  isConnected(): boolean {
    return this.accessToken != null;
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
      })
    }
  }

  getConnectUrl(): string {
    const clientID = environment.spotifyClientKey;
    // Remove fragment from current url, in case there's a bad access token attached
    const redirectUri = `${location.href.match(/(^[^#?]*)/)[0]}connect`;
    const scope = 'playlist-read-private';
    const connectUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
    return connectUrl;
  }

  processConnect(location): boolean {
    const parsedHash: any = queryString.parse(location.hash);
    if (parsedHash['access_token']) {
      this.accessToken = parsedHash['access_token'];
      const playlists = this.getPlaylists();
      return true;
    } else {
      this.accessToken = null;
      return false;
    }
  }

  getPlaylists() {
    const playlistsUrl: string = 'https://api.spotify.com/v1/me/playlists';
    this.http.get(playlistsUrl, this.getHeaders()).subscribe((res: any)=>{
      this.playlists = res.items;
    });
  }
}
