// Angular
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private spotifyApiService: SpotifyApiService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkSpotifyConnection();
  }

  // Check if the user has connected their spotify account
  checkSpotifyConnection() {
    if (this.spotifyApiService.isConnected()) {
      return true;
    } else {
      // If the user's spotify account is not connected, redirect back to the home screen
      this.router.navigate(['']);
      return false;
    }
  }
}
