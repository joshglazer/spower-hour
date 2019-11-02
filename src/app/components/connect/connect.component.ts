import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { SpotifyApiService } from '../../services/spotify-api/spotify-api.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  constructor(private spotifyApiService: SpotifyApiService, private router: Router) { }

  ngOnInit() {
    const connected: boolean = this.spotifyApiService.processConnect(window.location);
    if (!connected) {
      alert('Uh Oh! It looks like you did not agree to allow us to access your Spotify account. Please try again and make sure you click the "Agree" button.');
    }
    this.router.navigate(['/']);
  }

}
