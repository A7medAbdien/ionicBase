import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard';
import { Store, StoreModule } from '@ngrx/store';
import { loginReducer } from 'src/app/shared/store/login/login.reducers';
import { AppState } from 'src/app/shared/store/AppState';
import { loginSuccess } from 'src/app/shared/store/login/login.actions';
import { User } from 'src/app/shared/model/user/User';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from 'src/app/pages/login/login.page';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: Store<AppState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        StoreModule.forRoot([]),
        StoreModule.forFeature('login', loginReducer),
        RouterTestingModule.withRoutes(
          [{
            path: 'login',
            component: LoginPage
          }]
        )
      ]
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
  });

  it('should allowed logged user to access page', () => {
    store.dispatch(loginSuccess({ user: new User() }))

    guard.canLoad().subscribe(isAllowed => (
      expect(isAllowed).toBeTruthy()
    ))
  });

  it('should not allowed not logged user to access page', () => {
    guard.canLoad().subscribe(isAllowed => (
      expect(isAllowed).toBeFalsy()
    ))
  });

  it('should not allowed users to sent to the login page', () => {
    spyOn(router, 'navigateByUrl');

    guard.canLoad().subscribe(() => {
      expect(router.navigateByUrl).toHaveBeenCalledWith('login');
    })
  })
});
