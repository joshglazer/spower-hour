// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss'],
})
export class NowPlayingComponent {
  constructor(private spowerHourService: SpowerHourService) {}

  isVisible(): boolean {
    return this.spowerHourService.getCurrentTrack() !== null;
  }
}
