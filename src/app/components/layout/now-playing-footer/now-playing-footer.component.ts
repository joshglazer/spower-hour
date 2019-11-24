// Angular
import { Component, OnInit } from '@angular/core';

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
  ) { }

  ngOnInit() {
  }

}
