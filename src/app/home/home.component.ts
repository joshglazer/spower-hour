import { Component, OnInit, HostListener } from '@angular/core';

import { SpotifyApiService } from '../spotify-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  counter: number = null;
  currentStep: number = 0;

  constructor(public spotifyApiService: SpotifyApiService) { }

  ngOnInit(): void {
    if (this.spotifyApiService.isConnected()) {
      this.currentStep = 1;
    }
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
    console.log(this.spotifyApiService.playlistSelected);
    this.currentStep = 2;
    console.log(this.currentStep);
  }

  resetCounter(): void {
    this.counter = 16;
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
