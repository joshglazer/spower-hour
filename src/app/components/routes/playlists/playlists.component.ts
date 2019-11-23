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
    this.spotifyApiService.getDevices();
    this.spotifyApiService.getPlaylists();
  }

  fixBrokenImage(index) {
    console.log(index);
    this.spotifyApiService.playlistFixBrokenImage(index);
  }

}
