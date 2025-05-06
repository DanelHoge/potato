import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { withDevtools, updateState } from '@angular-architects/ngrx-toolkit';

export type AppState = {
  loggedIn: boolean;
  currentUser: string | null;
};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withDevtools('AppStore'),
  withState<AppState>({
    loggedIn: false,
    currentUser: null
  }),
  withMethods((store) => ({
    // login: () =>
    //   updateState(store, 'LOGIN', (state) => ({
    //     ...state,
    //     loggedIn: true
    //   })),
    login: (user: string) => patchState(store, { loggedIn: true, currentUser: user  }),
    logout: () => patchState(store, { loggedIn: false, currentUser: null }),
  }))
);
