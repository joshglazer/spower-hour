// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { AppRoutingModule } from '@app/app-routing.module';
import { NgxMasonryModule } from 'ngx-masonry';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

// Components
import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@app/components/routes/home/home.component';
import { ConnectComponent } from '@app/components/routes/connect/connect.component';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';
import { PlaylistsComponent } from '@app/components/routes/playlists/playlists.component';
import { HeaderComponent } from '@app/components/layout/header/header.component';
import { FooterComponent } from '@app/components/layout/footer/footer.component';
import { NowPlayingComponent } from './components/layout/now-playing/now-playing.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnectComponent,
    PlaylistsComponent,
    HeaderComponent,
    FooterComponent,
    NowPlayingComponent
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
    SpotifyApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }