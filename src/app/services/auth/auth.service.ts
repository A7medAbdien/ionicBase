import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/model/user/User';

import { setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from 'firebase/auth';
import { Auth, UserCredential, sendPasswordResetEmail } from '@angular/fire/auth';
import { UserRegister } from 'src/app/shared/model/user/UserRegister';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  constructor() { }

  register(userRegister: UserRegister): Observable<void> {
    return new Observable<void>(observer => {
      setTimeout(() => {
        if (userRegister.email == "error@gmail.com") {
          observer.error({ massage: "Error" });
        } else {
          observer.next();
        }
        observer.complete();
      }, 3000)
    })
  }

  recoverEmailPassword(email: string): Observable<void> {
    return new Observable<void>(observer => {
      sendPasswordResetEmail(this.auth, email).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
        observer.complete();
      })
    });
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
  }
}
