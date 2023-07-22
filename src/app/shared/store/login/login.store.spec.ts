import { User } from "../../model/user/User"
import { AppInitialState } from "../AppInitialState"
import { LoginState } from "./LoginState"
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions"
import { loginReducer } from "./login.reducers"

describe('Login store', () => {

  it('recoverPassword', () => {
    const initialState: LoginState = AppInitialState.login
    const newState = loginReducer(initialState, recoverPassword({ email: "any@email.com" }))

    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true
    })
  })

  it('recoverPasswordSuccess', () => {
    const initialState: LoginState = AppInitialState.login
    const newState = loginReducer(initialState, recoverPasswordSuccess())

    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false
    })
  })

  it('recoverPasswordFail', () => {
    const initialState: LoginState = AppInitialState.login
    const error = { error: 'error' };
    const newState = loginReducer(initialState, recoverPasswordFail({ error }))

    expect(newState).toEqual({
      ...initialState,
      error,
      isRecoveredPassword: false,
      isRecoveringPassword: false
    })
  })

  /**
   * Login
   */

  it('Login', () => {
    const initialState: LoginState = AppInitialState.login
    const newState = loginReducer(initialState, login())

    expect(newState).toEqual({
      ...initialState,
      isLoggingIn: true,
    })
  })

  it('LoginSuccess', () => {
    const initialState: LoginState = {
      ...AppInitialState.login,
      isLoggingIn: true,
    }
    const user = new User()
    user.id = 'anyId'
    const newState = loginReducer(initialState, loginSuccess({ user }))

    expect(newState).toEqual({
      ...initialState,
      isLoggingIn: false,
      isLoggedIn: true
    })
  })

  it('loginFail', () => {
    const initialState: LoginState = AppInitialState.login
    const error = { error: 'error' };
    const newState = loginReducer(initialState, loginFail({ error }))

    expect(newState).toEqual({
      ...initialState,
      error,
      isLoggingIn: false,
      isLoggedIn: false
    })
  })

})
