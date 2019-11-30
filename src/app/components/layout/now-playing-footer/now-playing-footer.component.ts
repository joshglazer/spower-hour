// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-now-playing-footer',
  templateUrl: './now-playing-footer.component.html',
  styleUrls: ['./now-playing-footer.component.scss']
})
export class NowPlayingFooterComponent implements OnInit {

  constructor(
    public spotifyApiService: SpotifyApiService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  isVisible() {
    return (this.router.url !== '/now-playing' && this.spotifyApiService.getCurrentTrack());
  }

}
