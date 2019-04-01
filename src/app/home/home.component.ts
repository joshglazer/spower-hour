import { Component, OnInit, HostListener } from '@angular/core';

import { SpotifyApiService } from '../spotify-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  counter: number = null;

  constructor(public spotifyApiService: SpotifyApiService) { }

  ngOnInit(): void {
  }

  @HostListener('window:beforeunload')
  stopSpotify() {
    this.spotifyApiService.stop();
  }

  spotifyConnect():void {
    window.location.href = this.spotifyApiService.getConnectUrl();
  }

  selectPlaylist(playlist) {
    this.resetCounter();
    this.spotifyApiService.selectPlaylist(playlist);
  }

  resetCounter(): void {
    this.counter = 11;
    this.counterTick();
  }

  counterTick(): void {
    this.counter--;
    if (this.counter <= 0) {
      this.spotifyApiService.playNextTrack();
      this.resetCounter();
    } else {
      setTimeout(() => { this.counterTick(); }, 1000);
    }
  }

}
