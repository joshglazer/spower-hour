// Angular
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

// Services
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';
import { Store } from '@ngrx/store';
import { RootStoreState, SpotifyApiStoreSelectors } from '@app/root-store';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private spowerHourService: SpowerHourService,
    private router: Router,
    private store: Store<RootStoreState.State>,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkSpotifyConnection();
  }

  // Check if the user has connected their spotify account
  checkSpotifyConnection() {
    console.log(window.location);
    console.log("HERE");
    this.store.select(SpotifyApiStoreSelectors.selectSpotifyApiAccessToken).pipe(
      mergeMap(storeAuth => {
        console.log("check auth", storeAuth);
        if (storeAuth) {
          return of(true);
        }
      }),
    );

    // If the user's spotify account is not connected, redirect back to the home screen
    this.router.navigate(['']);
    return false;
  }
}
