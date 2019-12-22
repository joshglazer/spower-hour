// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor(
    public spotifyApiService: SpotifyApiService
  ) { }

  ngOnInit() {
  }

}
