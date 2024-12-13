import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged, UserCredential } from "firebase/auth";
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { auth } from '../../app.config';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$ = auth.currentUser;
  private userLogged: boolean = false;


  constructor() {
    setPersistence(auth, browserSessionPersistence).then(() => {
      if(this.user$) {
        this.userLogged = true;
      } else {
        this.userLogged = false;
      }
    })
    .catch(error => {
      if(this.user$) {
        this.userLogged = true;
      } else {
        this.userLogged = false;
      }
      console.error("Error setting session persistence:", error);
    });
   }

  // async register(email: string, password: string, passwordRepeated: string): Promise<string> {
  //   if (password !== passwordRepeated) {
  //     return Promise.reject("Passwords don't match");
  //   }

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     return `User registered successfully: ${userCredential.user.email}`;
  //   } catch (error: any) {
  //     switch (error.code) {
  //       case 'auth/email-already-in-use':
  //         return Promise.reject('Email already in use');
  //       case 'auth/invalid-email':
  //         return Promise.reject('Invalid email address');
  //       case 'auth/weak-password':
  //         return Promise.reject('Password is too weak');
  //       default:
  //         return Promise.reject('An unknown error occurred');
  //     }
  //   }
  // }

  register(email: string, password: string, passwordRepeated: string): Observable<UserCredential> {

    if (password !== passwordRepeated) {
      return throwError(() => new Error("Passwords don't match"));
    }

    return from(createUserWithEmailAndPassword(auth, email, password)).pipe(
      map((userCredential) => {
        console.log(`User registered successfully: ${userCredential.user.email}`);
        return userCredential;
      }),
      catchError((error) => {
        let errorMessage = 'An unknown error occurred';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Email already in use';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak';
            break;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(auth, email, password).then(() => {this.userLogged = true});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = auth.signOut();
    this.userLogged = false
    return from(promise)
  }

  isLogged() {
    if(this.userLogged) {
      return true;
    } else {
      return false
    }
  }

  noUser() {
    if(!this.userLogged) {
      return true;
    } else {
      return false
    }
  }

}
