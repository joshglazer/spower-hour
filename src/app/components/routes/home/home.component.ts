// Angular
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';

// Misc
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faSpotify = faSpotify;

  constructor(
    public spotifyApiService: SpotifyApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.spotifyApiService.isConnected()) {
      this.router.navigate(['/playlists']);
    }

  }

  // @HostListener('window:beforeunload')
  // stopSpotify() {
  //   this.spotifyApiService.stop();
  // }

  spotifyConnect(): void {
    window.location.href = this.spotifyApiService.getConnectUrl();
  }

}
