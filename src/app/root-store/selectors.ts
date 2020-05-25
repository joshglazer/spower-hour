import { createSelector, MemoizedSelector } from '@ngrx/store';
import { SpotifyApiStoreSelectors } from './spotify-api-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
    SpotifyApiStoreSelectors.selectSpotifyApiError,
    (spotifyApi: string) => {
        return spotifyApi;
    }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
    SpotifyApiStoreSelectors.selectSpotifyApiIsLoading,
    (spotifyApi: boolean,) => {
        return spotifyApi;
    }
);