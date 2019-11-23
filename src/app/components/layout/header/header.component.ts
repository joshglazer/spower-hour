// Angular
import { Component, OnInit } from '@angular/core';

// Misc.
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faSpotify = faSpotify;
  faStopwatch = faStopwatch;

  constructor() { }

  ngOnInit() {
  }

}
