import { Component, OnInit } from '@angular/core';

import { SpotifyApiService } from '../spotify-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public spotifyApiService: SpotifyApiService) { }

  ngOnInit() {
  }

  spotifyConnect() {
    window.location.href = this.spotifyApiService.getConnectUrl();
  }

}
