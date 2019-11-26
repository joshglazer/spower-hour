import { Component, OnInit, Input } from '@angular/core';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-now-playing-info',
  templateUrl: './now-playing-info.component.html',
  styleUrls: ['./now-playing-info.component.scss']
})
export class NowPlayingInfoComponent implements OnInit {

  @Input() layout: string;

  constructor(
    public spotifyApiService: SpotifyApiService,
  ) { }

  ngOnInit() {
  }

}
