import { Component, OnInit, Input } from '@angular/core';

// Services
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';

@Component({
  selector: 'app-now-playing-info',
  templateUrl: './now-playing-info.component.html',
  styleUrls: ['./now-playing-info.component.scss'],
})
export class NowPlayingInfoComponent {
  @Input() layout: string;

  constructor(public spowerHourService: SpowerHourService) {}
}
