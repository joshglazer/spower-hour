// Angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

// Services
import { SpotifyApiService } from '../spotify-api/spotify-api.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(
    private spotifyApiService: SpotifyApiService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    return next.handle(request)
     .pipe(
       retry(1),
       catchError((error: HttpErrorResponse) => {
          this.spotifyApiService.setError(error);
          return throwError(error);
      })
    );
  }
}
