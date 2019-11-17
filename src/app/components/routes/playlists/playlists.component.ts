// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  counter: number = null;

  constructor(
    public spotifyApiService: SpotifyApiService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.spotifyApiService.isConnected()) {
      this.spotifyApiService.getDevices();
      this.spotifyApiService.getPlaylists();
    } else {
      this.router.navigate(['/']);
    }
  }

  setDevice(device) {
    this.spotifyApiService.setDevice(2);
    console.log(device);
  }

  selectPlaylist(playlist) {
    this.resetCounter();
    this.spotifyApiService.selectPlaylist(playlist);
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

  fixBrokenImage(index) {
    console.log(index);
    this.spotifyApiService.playlistFixBrokenImage(index);
  }


}
