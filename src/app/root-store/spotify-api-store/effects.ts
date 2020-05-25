import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as spotifyApiActions from './actions';
import { Router } from '@angular/router';
import { tap, mergeMap, map, switchMap, exhaustMap } from 'rxjs/operators';

@Injectable()
export class SpotifyApiStoreEffects {
    constructor(
        private actions$: Actions,
        private router: Router
    ) {}


    // login$ = createEffect(
    @Effect({ dispatch: false })
    navigate$ = this.actions$.pipe(
        ofType(spotifyApiActions.ActionTypes.LOGIN_SUCCESS),
        map((action) => action),
        tap(({ path, queryParams, extras }) => {
            this.router.navigate(['/playlists']);
        })
    );
//   );

    // @Effect()
    // loginRequestEffect$ = this.actions$.pipe(
    //     ofType<spotifyApiActions.LoginSuccessAction>(
    //         spotifyApiActions.ActionTypes.LOGIN_SUCCESS
    //     ),
    //     pipe(

    //     )
    //     exhaustMap(() => {
    //         console.log("REDIRECT NOW");

    //       }),
    //     // tap(() => {
    //     //     console.log("REDIRECT NOW");
    //     //     // this.router.navigate(['/playlists']);
    //     // })
    // );
}

