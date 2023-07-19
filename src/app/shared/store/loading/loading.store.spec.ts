import { createAction } from "@ngrx/store";
import { LoadingState } from "./LoadingState"
import { hide, show } from "./loading.actions";
import { loadingReducer } from "./loading.reducers";

describe('Loading Store', () => {

  it('show', () => {
    const initialState: LoadingState = { show: false };
    const newState = loadingReducer(initialState, show())

    expect(newState.show).toBeTruthy()
  })

  it('hide', () => {
    const initialState: LoadingState = { show: true };
    const newState = loadingReducer(initialState, hide())

    expect(newState.show).toBeFalsy()

  })

  it('Unknown', () => {
    const initialState: LoadingState = { show: true };
    const action = createAction("unknown")
    const newState = loadingReducer(initialState, action)

    expect(newState.show).toBeTruthy()

  })

})
