import { Component, OnInit, HostListener } from '@angular/core';

import { SpotifyApiService } from '../../services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  counter: number = null;
  currentStep = 0;
  maxStep = 0;

  constructor(public spotifyApiService: SpotifyApiService) { }

  ngOnInit(): void {
    if (this.spotifyApiService.isConnected()) {
      this.setStep(1);
      this.spotifyApiService.getDevices();
      this.spotifyApiService.getPlaylists();
    }
  }

  @HostListener('window:beforeunload')
  stopSpotify() {
    this.spotifyApiService.stop();
  }

  setStep(step: number): void {
    if (step > this.maxStep) {
      this.maxStep = step;
    }
    // Spin off async thread to set the step for the material stepper
    // If this is done syncronously, the stepper does not change
    setTimeout(() => this.currentStep = step, 500);
  }

  checkStep(step: number): boolean {
    return (this.maxStep >= step);
  }

  spotifyConnect(): void {
    window.location.href = this.spotifyApiService.getConnectUrl();
  }

  setDevice(device) {
    this.setStep(2);
    this.spotifyApiService.setDevice(2);
    console.log(device);
  }

  selectPlaylist(playlist) {
    this.resetCounter();
    this.spotifyApiService.selectPlaylist(playlist);
    console.log(this.spotifyApiService.playlistSelected);
    this.setStep(3);
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
