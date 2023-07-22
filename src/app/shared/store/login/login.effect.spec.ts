import { Observable, of, throwError } from "rxjs";
import { LoginEffects } from "./login.effects";
import { TestBed } from "@angular/core/testing";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { Action, StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing"
import { AuthService } from "src/app/services/auth/auth.service";

describe('Login effects', () => {

  let effects: LoginEffects;
  let actions$: Observable<Action>;
  let error = { error: 'error' }
  let authServiceMock = {
    recoverEmailPassword: (email: string) => {
      if (email == "error@email.com") {
        return throwError(() => error)
      }
      return of({})
    }
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([
          LoginEffects
        ])
      ],
      providers: [
        provideMockActions(() => actions$)
      ]
    }).overrideProvider(AuthService, { useValue: authServiceMock })

    effects = TestBed.inject(LoginEffects);
  })

  it('should recover password with exciting email return success', (done) => {
    actions$ = of(recoverPassword());

    effects.recoverPassword$.subscribe((newAction) => {
      expect(newAction).toEqual(recoverPasswordSuccess());
      done();
    })
  })

  it('should recover password with not exciting email return an error', (done) => {
    actions$ = of(recoverPassword());

    effects.recoverPassword$.subscribe((newAction) => {
      expect(newAction).toEqual(recoverPasswordFail({ error }));
      done();
    })
  })
})
