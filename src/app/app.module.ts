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

// Material
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

// Components
import { AppComponent } from '@app/app.component';
import { HomeComponent } from '@app/components/routes/home/home.component';
import { ConnectComponent } from '@app/components/routes/connect/connect.component';

// Services
import { SpotifyApiService } from '@app/services/spotify-api/spotify-api.service';
import { PlayComponent } from '@app/components/routes/play/play.component';
import { HeaderComponent } from '@app/components/layout/header/header.component';
import { FooterComponent } from '@app/components/layout/footer/footer.component';

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