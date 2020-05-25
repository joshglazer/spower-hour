// Angular
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

// NgRx
import { RootStoreState, SpotifyApiStoreActions } from '@app/root-store';

// Services
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';
import { Store } from '@ngrx/store';

// Misc.
import * as queryString from 'query-string';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  constructor(
    private spowerHourService: SpowerHourService,
    private router: Router,
    private store: Store<RootStoreState.State>
  ) { }

  ngOnInit() {
    const parsedHash: any = queryString.parse(location.hash);
    if (parsedHash.access_token) {
      this.store.dispatch(new SpotifyApiStoreActions.LoginSuccessAction({accessToken:parsedHash.access_token}));
    }
  }

}
