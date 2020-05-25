import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SpotifyApiStoreEffects } from './effects';
import { spotifyApiReducer } from './reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('spotifyApi', spotifyApiReducer ),
    EffectsModule.forFeature([SpotifyApiStoreEffects])
  ],
  providers: [SpotifyApiStoreEffects]
})
export class SpotifyApiStoreModule { }
