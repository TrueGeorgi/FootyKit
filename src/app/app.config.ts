import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import * as firebase from 'firebase/app'
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../environments/firebaseConfig';
// import { getFirestore } from 'firebase/firestore'
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import admin from 'firebase-admin';

const firebaseApp = firebase.initializeApp(firebaseConfig);


export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync()]
};


