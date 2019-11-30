// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';

// Misc
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  faVolumeUp = faVolumeUp;
  faSync = faSync;

  constructor(
    public spotifyApiService: SpotifyApiService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  setDevice(device) {
    this.spotifyApiService.setDevice(device);
  }

}
