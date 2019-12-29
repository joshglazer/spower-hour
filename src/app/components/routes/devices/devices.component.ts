// Angular
import { Component, OnInit } from '@angular/core';

// Services
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';

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
    public spowerHourService: SpowerHourService
  ) { }

  ngOnInit() { }

}
