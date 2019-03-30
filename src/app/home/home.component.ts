import { Component, OnInit } from '@angular/core';

import { SpotifyApiService } from '../spotify-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  counter: number = null;

  constructor(public spotifyApiService: SpotifyApiService) { }

  ngOnInit() {
  }

  spotifyConnect() {
    window.location.href = this.spotifyApiService.getConnectUrl();
  }

  selectPlaylist(playlist) {
    this.resetCounter();
    this.spotifyApiService.selectPlaylist(playlist);
  }

  resetCounter() {
    this.counter = 61;
    this.counterTick();
  }

  counterTick() {
    this.counter--;
    if (this.counter <= 0) {
      this.spotifyApiService.playNextTrack();
      this.resetCounter();
    } else {
      setTimeout(() => { this.counterTick(); }, 1000);
    }
  }

}
