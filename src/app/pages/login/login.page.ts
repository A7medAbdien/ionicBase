import { ToastController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/AppState';
import { hide, show } from 'src/app/shared/store/loading/loading.actions';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/app/shared/store/login/login.actions';
import { LoginState } from 'src/app/shared/store/login/LoginState';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  loginStateSub: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private toastController: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initForm();

    this.loginStateSub = this.store.select('login').subscribe(loginState => {
      // this.onIsRecoveringPassword(loginState)
      this.onIsRecoveredPassword(loginState)

      // this.onIsLoggingIn(loginState)
      this.onIsLoggedIn(loginState)

      this.onError(loginState)
      this.toggleLoading(loginState)
    })
  }

  ngOnDestroy(): void {
    if (this.loginStateSub) {
      this.loginStateSub.unsubscribe();
    }
  }

  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.router.navigate(['home'])
    }
  }

  // private onIsLoggingIn(loginState: LoginState) {
  //   if (loginState.isLoggingIn) {
  //     const email = this.form.controls['email'].value
  //     const password = this.form.controls['password'].value

  //     this.authService.login(email, password).subscribe({
  //       next: (user) => this.store.dispatch(loginSuccess({ user })),
  //       error: (error) => this.store.dispatch(loginFail({ error }))
  //     })
  //   }
  // }

  private toggleLoading(loginState: LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }


  // private onIsRecoveringPassword(loginState: LoginState) {
  //   if (loginState.isRecoveringPassword) {
  //     this.authService.recoverEmailPassword(this.form.controls['email'].value)
  //       .subscribe({
  //         next: () => this.store.dispatch(recoverPasswordSuccess()),
  //         error: (error) => this.store.dispatch(recoverPasswordFail({ error }))
  //       });
  //   }
  // }

  private async onIsRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'Recover password sent',
        color: 'primary'
      })
      toaster.present();
    }
  }

  private async onError(loginState: LoginState) {
    if (loginState.error) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger'
      });
      toaster.present();
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  login() {
    this.store.dispatch(login());
  }

  register() {
    this.router.navigate(['register']);
  }

  forgotPassword() {
    this.store.dispatch(recoverPassword({ email: this.form.controls['email'].value }));
  }
}
