// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent {
  counter: number = null;

  constructor(public spowerHourService: SpowerHourService) {}

  fixBrokenImage(index: number): void {
    this.spowerHourService.playlistFixBrokenImage(index);
  }
}
