// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { NgxMasonryModule } from 'ngx-masonry';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Material
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/routes/home/home.component';
import { ConnectComponent } from './components/routes/connect/connect.component';

// Services
import { SpotifyApiService } from './services/spotify-api/spotify-api.service';
import { PlayComponent } from './components/routes/play/play.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnectComponent,
    PlayComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMasonryModule,
    MatIconModule,
    MatStepperModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    FontAwesomeModule,
  ],
  providers: [
    SpotifyApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }