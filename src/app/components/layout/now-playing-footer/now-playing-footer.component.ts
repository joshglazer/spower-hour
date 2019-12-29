// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';

@Component({
  selector: 'app-now-playing-footer',
  templateUrl: './now-playing-footer.component.html',
  styleUrls: ['./now-playing-footer.component.scss']
})
export class NowPlayingFooterComponent implements OnInit {

  constructor(
    public spowerHourService: SpowerHourService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  isVisible() {
    return (this.router.url !== '/now-playing' && this.spowerHourService.getCurrentTrack());
  }

}
