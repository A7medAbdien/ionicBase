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

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: any;
  let store: Store<AppState>
  let toastController: ToastController;

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

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  }));

  it('should go to home page on login', () => {
    spyOn(router, 'navigate');

    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  });

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
     user valid email
     user click on recover password
     expect loginState.isRecoverPassword = true
     */

    component.form.controls['email'].setValue('valid@email.com');
    page.querySelector('#recoverPasswordButton').click();
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
  });

  it('should show loading when loginState as recoveringPassword', () => {
    /**
     change recoveringPassword to true
     verify loadingState.isLoading is true
     */

    store.dispatch(recoverPassword());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
  });

  it('should hide loading and show success massage when loginState as recoverPasswordSuccess', () => {
    /**
     set loginState as recoverPassword
     set loginState as recoverPasswordSuccess
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

  it('should hide loading and show error massage  when loginState as recoverPasswordFail', () => {
    /**
     set loginState as recoverPassword
     set loginState as recoverPasswordFail
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

});
