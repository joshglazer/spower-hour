// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit {

  constructor(
    private spowerHourService: SpowerHourService
  ) { }

  ngOnInit() {
  }

  isVisible() {
    return this.spowerHourService.getCurrentTrack();
  }
}
