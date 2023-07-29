import { AppState } from './AppState';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AppInitialState: AppState = {
  loading: {
    show: false
  },
  login: {
    error: null,
    isRecoveredPassword: false,
    isRecoveringPassword: false,
    isLoggedIn: false,
    isLoggingIn: false,
  },
  register: {
    error: null,
    isRegistering: false,
    isRegistered: false,
  }
};
