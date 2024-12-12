import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";
import { from, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private auth = getAuth();
  user = this.auth.currentUser;


  constructor() {
    setPersistence(this.auth, browserSessionPersistence)
    .catch(error => {
      console.error("Error setting session persistence:", error);
    });
   }

  async register(email: string, password: string, passwordRepeated: string): Promise<string> {
    if (password !== passwordRepeated) {
      return Promise.reject("Passwords don't match");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return `User registered successfully: ${userCredential.user.email}`;
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          return Promise.reject('Email already in use');
        case 'auth/invalid-email':
          return Promise.reject('Invalid email address');
        case 'auth/weak-password':
          return Promise.reject('Password is too weak');
        default:
          return Promise.reject('An unknown error occurred');
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout() {
    return this.auth.signOut();
  }

}
