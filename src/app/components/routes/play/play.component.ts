// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  counter: number = null;
  currentStep = 0;
  maxStep = 0;

  updateMasonryLayout = false;

  constructor(
    public spotifyApiService: SpotifyApiService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.spotifyApiService.isConnected()) {
      this.setStep(0);
      this.spotifyApiService.getDevices();
      this.spotifyApiService.getPlaylists();
    } else {
      this.router.navigate(['/']);
    }
  }

  setStep(step: number): void {
    if (step > this.maxStep) {
      this.maxStep = step;
    }
    // Spin off async thread to set the step for the material stepper
    // If this is done syncronously, the stepper does not change
    setTimeout(() => {
      this.currentStep = step;
      this.updateMasonryLayout = true;
    }, 0);
  }

  checkStep(step: number): boolean {
    return (this.maxStep >= step);
  }

  setDevice(device) {
    this.setStep(1);
    this.spotifyApiService.setDevice(2);
    console.log(device);
  }

  selectPlaylist(playlist) {
    this.resetCounter();
    this.spotifyApiService.selectPlaylist(playlist);
    this.setStep(2);
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
