import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  spotifyConnect() {
    const clientID = environment.spotifyClientKey;
    // Remove fragment from current url, in case there's a bad access token attached
    const redirectUri = `${location.href.match(/(^[^#?]*)/)[0]}connect/`;
    const scope = 'playlist-read-private';
    const connectUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
    window.location.href = connectUrl;
  }

}
