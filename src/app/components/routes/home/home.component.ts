// Angular
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';

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
    private spowerHourService: SpowerHourService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.spowerHourService.isConnected()) {
      this.router.navigate(['/playlists']);
    }
  }

  spotifyConnect(): void {
    this.spowerHourService.spotifyConnect();
  }

}
