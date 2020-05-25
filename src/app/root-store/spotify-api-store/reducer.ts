import { Actions, ActionTypes } from './actions';
import { initialState, State } from './state';

export function spotifyApiReducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
    console.log("Set access token")
      return {
        ...state,
        accessToken: action.payload.accessToken,
        error: null,
      };
    default: {
      return state;
    }
  }
}
