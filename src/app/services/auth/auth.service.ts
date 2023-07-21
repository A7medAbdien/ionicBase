import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user/User';

import { setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from 'firebase/auth';
import { Auth, UserCredential, sendPasswordResetEmail } from '@angular/fire/auth';

// // Old version
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import * as firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  constructor() { }
  // constructor(private auth: AngularFireAuth) { }

  recoverEmailPassword(email: string): Observable<void> {

    // angular/fire/auth version
    return new Observable<void>(observer => {
      sendPasswordResetEmail(this.auth, email).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
        observer.complete();
      })
    });

    // // Old version
    // return new Observable<void>(observer => {
    // this.auth.sendPasswordResetEmail(email).then(() => {
    //   observer.next();
    //   observer.complete();
    // }).catch(error => {
    //   observer.error(error);
    //   observer.complete();
    // })
    // });

    //   setTimeout(() => {
    //     if (email === 'error@email.com') {
    //       observer.error({ message: 'Email not found' });
    //     }
    //     observer.next();
    //     observer.complete();
    //   }, 3000);
    // });
  }

  login(email: string, password: string): Observable<User> {

    return new Observable<User>(observer => {
      setPersistence(this.auth, browserLocalPersistence).then(() => {
        signInWithEmailAndPassword(this.auth, email, password)
          .then((firebaseUser: UserCredential) => {
            observer.next({ email, id: firebaseUser.user.uid });
            observer.complete();
          })
          .catch((err) => {
            observer.error(err);
            observer.complete();
          });
      });
    });

    // return new Observable<User>(observer => {
    //   this.auth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
    //     this.auth.signInWithEmailAndPassword(email, password)
    //       .then((firebaseUser: firebase.default.auth.UserCredential) => {
    //         observer.next({ email, id: firebaseUser.user!.uid });
    //         observer.complete();
    //       }).catch(error => {
    //         observer.error(error);
    //         observer.complete();
    //       })
    //   })
    // })

    // return new Observable<User>(observer => {
    //   setTimeout(() => {
    //     if (email === 'error@email.com') {
    //       observer.error({ message: 'User not found' });
    //     } else {
    //       const user = new User();
    //       user.email = email;
    //       observer.next(user);
    //     }
    //     observer.complete();
    //   }, 3000);
    // });
  }
}
