// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { AppRoutingModule } from '@app/app-routing.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

// Components
import { AppComponent } from '@app/app.component';
// Route Components
import { HomeComponent } from '@app/components/routes/home/home.component';
import { ConnectComponent } from '@app/components/routes/connect/connect.component';
import { DevicesComponent } from '@app/components/routes/devices/devices.component';
import { PlaylistsComponent } from '@app/components/routes/playlists/playlists.component';
import { NowPlayingComponent } from './components/routes/now-playing/now-playing.component';
import { ErrorComponent } from './components/routes/error/error.component';
// Layout Components
import { HeaderComponent } from '@app/components/layout/header/header.component';
import { FooterComponent } from '@app/components/layout/footer/footer.component';
import { NowPlayingFooterComponent } from '@app/components/layout/now-playing-footer/now-playing-footer.component';
import { NowPlayingInfoComponent } from './components/layout/now-playing-info/now-playing-info.component';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';
import { SpowerHourService } from '@app/services/spower-hour/spower-hour.service';
import { HttpErrorInterceptorService } from '@app/services/http-error-interceptor/http-error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnectComponent,
    PlaylistsComponent,
    HeaderComponent,
    FooterComponent,
    NowPlayingFooterComponent,
    DevicesComponent,
    NowPlayingComponent,
    NowPlayingInfoComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMasonryModule,
    MatButtonModule,
    FontAwesomeModule,
    FlexLayoutModule,
  ],
  providers: [
    SpotifyApiService,
    SpowerHourService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
