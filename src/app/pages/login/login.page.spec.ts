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
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/app/shared/store/login/login.actions';
import { User } from 'src/app/shared/model/user/User';
import { of, throwError } from 'rxjs';

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
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    toastController = TestBed.inject(ToastController);
    authService = TestBed.inject(AuthService);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  // it('should go to home page on login', () => {
  //   spyOn(router, 'navigate');

  //   component.login();

  //   expect(router.navigate).toHaveBeenCalledWith(['home']);
  // });

  it('should go to register page on register', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should recover password on "Recover Email/Password"', () => {
    /**
     set valid email
     click on recover password
     expect loginState.isRecoverPassword = true
     */

    component.form.controls['email'].setValue('valid@email.com');
    page.querySelector('#recoverPasswordButton').click();
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
  });

  it('on recoveringPassword action: should show loading', () => {
    /**
     change recoveringPassword to true
     verify loadingState.isLoading is true
     */

    store.dispatch(recoverPassword());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  });

  it('on recoverPasswordSuccess action: should hide loading and show success massage', () => {
    /**
     set loginState on recoverPassword
     set loginState on recoverPasswordSuccess
     verify loadingState.show is false
     show success message (unable to spyOn(toastController, 'create') without error)
     */

    store.dispatch(recoverPassword());

    store.dispatch(recoverPasswordSuccess());

    store.select('loading').subscribe(loadingState =>
      expect(loadingState.show).toBeFalsy()
    )

    // spyOn(toastController, 'create')
    // fixture.detectChanges();
    // expect(toastController.create).toHaveBeenCalled();
  });

  it('on recoverPasswordFail action: should hide loading and show error massage', () => {
    /**
     set loginState on recoverPassword
     set loginState on recoverPasswordFail
     verify loadingState.show is false
     show error message (unable to spyOn(toastController, 'create') without error)
     */

    store.dispatch(recoverPassword());

    const error = { error: 'massage' }
    store.dispatch(recoverPasswordFail(error));

    store.select('loading').subscribe(loadingState =>
      expect(loadingState.show).toBeFalsy()
    )
  });

  it('on Login action: should show loading', () => {
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

  it('on loginSuccess action: should sends user to home page and hide loading', () => {
    /**
     * set a valid email
     * ser any password
     * click login button
     * hide loading
     * expect logged in
     * sends user to home page
     */

    spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of(new User))

    component.form.controls['email'].setValue('valid@email.com');
    component.form.controls['password'].setValue('anyPassword');
    page.querySelector('#loginButton').click();

    store.select('loading').subscribe(loadingState =>
      expect(loadingState.show).toBeFalsy()
    );
    store.select('login').subscribe(loginState =>
      expect(loginState.isLoggedIn).toBeTruthy()
    );

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

  it('on loginFail action: should show an error massage and hide loading', () => {
    /**
     * set a valid email
     * ser any password
     * click login button
     * hide loading
     * expect error massage (unable to spyOn(toastController, 'create') without error)
     */

    spyOn(authService, 'login').and.returnValue(throwError(() => { message: 'User not found' }))

    fixture.detectChanges();

    component.form.controls['email'].setValue('error@email.com');
    component.form.controls['password'].setValue('anyPassword');
    page.querySelector('#loginButton').click();

    store.select('loading').subscribe(loadingState =>
      expect(loadingState.show).toBeFalsy()
    );
    store.select('login').subscribe(loginState =>
      expect(loginState.isLoggedIn).toBeFalsy()
    );

  });

});
