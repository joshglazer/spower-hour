// Angular
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SpotifyApiService } from '../../../services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public spotifyApiService: SpotifyApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.spotifyApiService.isConnected()) {
      this.router.navigate(['/play']);
    }

  }

  @HostListener('window:beforeunload')
  stopSpotify() {
    this.spotifyApiService.stop();
  }

  spotifyConnect(): void {
    window.location.href = this.spotifyApiService.getConnectUrl();
  }

}
