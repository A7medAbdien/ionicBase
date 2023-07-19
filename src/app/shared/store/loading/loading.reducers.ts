import { LoadingState } from './LoadingState';
import { Action, createReducer, on } from '@ngrx/store';
import { hide, show } from './loading.actions';
import { AppInitialState } from '../AppInitialState';

const initialState: LoadingState = AppInitialState.loading

const reducer = createReducer(
  initialState,
  on(show, () => {
    return { show: true }
  }),
  on(hide, () => {
    return { show: false }
  }),
);


export function loadingReducer(state: LoadingState, action: Action) {
  return reducer(state, action);
}
