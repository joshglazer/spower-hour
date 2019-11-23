// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  constructor(
    public spotifyApiService: SpotifyApiService,
  ) { }

  ngOnInit() {
  }

}
