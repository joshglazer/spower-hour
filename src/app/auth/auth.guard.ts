// Angular
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

// Services
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private spowerHourService: SpowerHourService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkSpotifyConnection();
  }

  // Check if the user has connected their spotify account
  checkSpotifyConnection() {
    if (this.spowerHourService.isConnected()) {
      return true;
    } else {
      // If the user's spotify account is not connected, redirect back to the home screen
      this.router.navigate(['']);
      return false;
    }
  }
}
