import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged, UserCredential, updateProfile } from "firebase/auth";
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { auth } from '../../app.config';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$ = auth.currentUser;
  private userLogged: boolean = false;


  constructor(private router: Router) {
    setPersistence(auth, browserSessionPersistence).then(() => {
      if(auth.currentUser) {
        this.userLogged = true;
      } else {
        this.userLogged = false;
      }
    })
    .catch(error => {
      if(auth.currentUser) {
        this.userLogged = true;
      } else {
        this.userLogged = false;
      }
      console.error("Error setting session persistence:", error);
    });
   }

  register(email: string, password: string, passwordRepeated: string): Observable<UserCredential> {

    if (password !== passwordRepeated) {
      return throwError(() => new Error("Passwords don't match"));
    }

    return from(createUserWithEmailAndPassword(auth, email, password)).pipe(
      map((userCredential) => {
        console.log(`User registered successfully: ${userCredential.user.email}`);
        this.login(email, password)
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

  isLogged(): boolean {
    if(this.userLogged) {
      return true;
    } else {
      return false
    }
  }

  noUser(): boolean {
    if(!this.userLogged) {
      return true;
    } else {
      return false
    }
  }

  getUserEmail(): string | null | undefined {
    return auth.currentUser?.email
  }

  setNickname(nickname: string): void {
    if(auth.currentUser) {
      updateProfile(auth.currentUser, {displayName: nickname}).then(() => {
        return auth.currentUser?.displayName
      }).catch((error) => {
        return error
      })
    }
  }

  getNickname(): string {
    if (auth.currentUser?.displayName) {
      return auth.currentUser?.displayName
    } else {
      return ''
    }
    
  }

  getUserId(): string | null {
    if(auth.currentUser) {
      return auth.currentUser?.uid;
    } else {
      return null
    }
  }

  deleteProfile(userId: string): boolean {
   
    

    if(auth.currentUser) {
      auth.currentUser.delete().then(()=>{
        console.log('Success !!!');
        this.logout()
        this.router.navigate([''])
        return true
      }).catch((error)=>{ 
       console.log("Error: ", error);
       return false
      })
    }

    return false
  }

}
