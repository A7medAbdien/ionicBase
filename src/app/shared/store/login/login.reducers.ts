import { Action, createReducer, on } from "@ngrx/store";
import { AppInitialState } from "../AppInitialState";
import { LoginState } from "./LoginState";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";

const initialState: LoginState = AppInitialState.login;
const reducer = createReducer(initialState,
  on(recoverPassword, currentState =>
  ({
    ...currentState,
    error: null,
    isRecoveredPassword: false,
    isRecoveringPassword: true,
  })),
  on(recoverPasswordSuccess, currentState =>
  ({
    ...currentState,
    error: null,
    isRecoveredPassword: true,
    isRecoveringPassword: false,
  })),
  on(recoverPasswordFail, (currentState, action) =>
  ({
    ...currentState,
    error: action.error,
    isRecoveredPassword: false,
    isRecoveringPassword: false,
  })),
);

export function loginReducer(state: LoginState, action: Action) {
  return reducer(state, action)
}
