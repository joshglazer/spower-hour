import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SpotifyApiStoreModule } from './spotify-api-store/spotify-api-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpotifyApiStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ]
})
export class RootStoreModule { }
