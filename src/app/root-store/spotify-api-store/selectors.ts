import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { State } from './state';

const getAccessToken = (state: State): string => state.accessToken;

const getError = (state: State): any => state.error;

const getIsLoading = (state: State): boolean => state.isLoading;

export const selectSpotifyApiState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('spotifyApi');

export const selectSpotifyApiError: MemoizedSelector<
  object,
  any
> = createSelector(
  selectSpotifyApiState,
  getError
);

export const selectSpotifyApiIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectSpotifyApiState,
  getIsLoading
);

export const selectSpotifyApiAccessToken: MemoizedSelector<
  object,
  string
> = createSelector(
  selectSpotifyApiState,
  getAccessToken
);