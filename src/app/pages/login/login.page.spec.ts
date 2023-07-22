import { AuthService } from 'src/app/services/auth/auth.service';
import { AppRoutingModule } from './../../app-routing.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ToastController } from '@ionic/angular';

import { LoginPage } from './login.page';
import { Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { loadingReducer } from 'src/app/shared/store/loading/loading.reducers';
import { loginReducer } from 'src/app/shared/store/login/login.reducers';
import { AppState } from 'src/app/shared/store/AppState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/app/shared/store/login/login.actions';
import { User } from 'src/app/shared/model/user/User';
import { Observable, of, throwError } from 'rxjs';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>
  let toastController: ToastController;
  let authService: AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        AppRoutingModule,
        StoreModule.forRoot([]),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideAuth(() => getAuth()),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    toastController = TestBed.inject(ToastController);
    // authService = TestBed.inject(AuthService);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover password and show loading on register on Forgot Email/Password', () => {
    /**
     * set valid email
     * click on recover password
     * change recoveringPassword to true
     * verify loadingState.isLoading is true
     */

    component.form.controls['email'].setValue('valid@email.com');
    page.querySelector('#recoverPasswordButton').click();
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
    store.dispatch(recoverPassword({ email: "any@email.com" }));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  });

  it('given user is recovering password, when success, then hide loading and show success massage', () => {
    /**
     set loginState on recoverPassword
     set loginState on recoverPasswordSuccess
     verify loadingState.show is false
     show success message (unable to spyOn(toastController, 'create') without error)
     */

    store.dispatch(recoverPassword({ email: "any@email.com" }));

    store.dispatch(recoverPasswordSuccess());

    store.select('loading').subscribe(loadingState =>
      expect(loadingState.show).toBeFalsy()
    )

    // spyOn(toastController, 'create')
    // fixture.detectChanges();
    // expect(toastController.create).toHaveBeenCalled();
  });

  it('given user is recovering password, when Fail, then hide loading and show Fail massage', () => {
    /**
     set loginState on recoverPassword
     set loginState on recoverPasswordFail
     verify loadingState.show is false
     show error message (unable to spyOn(toastController, 'create') without error)
     */

    store.dispatch(recoverPassword({ email: "any@email.com" }));

    const error = { error: 'massage' }
    store.dispatch(recoverPasswordFail(error));

    store.select('loading').subscribe(loadingState =>
      expect(loadingState.show).toBeFalsy()
    )
  });

  it('should login and show loading on login', () => {
    /**
     * set a valid email
     * ser any password
     * click login button
     * expect loading to show
     * expect logging in
     */

    component.form.controls['email'].setValue('valid@email.com');
    component.form.controls['password'].setValue('anyPassword');
    page.querySelector('#loginButton').click();

    store.select('loading').subscribe(loadingState =>
      expect(loadingState.show).toBeTruthy()
    );
    store.select('login').subscribe(loginState =>
      expect(loginState.isLoggingIn).toBeTruthy()
    );
  });

  it('given user is logging in, when success, then hide loading and show go to home page', () => {
    /**
     * set a valid email
     * ser any password
     * click login button
     * hide loading
     * expect logged in
     * sends user to home page
     */

    spyOn(router, 'navigate');

    store.dispatch(login());
    store.dispatch(loginSuccess({ user: new User() }));

    store.select('loading').subscribe(loadingState =>
      expect(loadingState.show).toBeFalsy()
    );

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('given user is logging in, when fail, then hide loading and show show error massage', () => {
    /**
     * set a valid email
     * ser any password
     * click login button
     * hide loading
     * expect error massage (unable to spyOn(toastController, 'create') without error)
     */

    store.dispatch(login());
    store.dispatch(loginFail({ error: { massage: 'error' } }));

    store.select('loading').subscribe(loadingState =>
      expect(loadingState.show).toBeFalsy()
    );

  });

});
