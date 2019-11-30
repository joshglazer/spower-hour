// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit {

  constructor(
    private spotifyApiService: SpotifyApiService
  ) { }

  ngOnInit() {
  }

  isVisible() {
    return this.spotifyApiService.getCurrentTrack();
  }
}
