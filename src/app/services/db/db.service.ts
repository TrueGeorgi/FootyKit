import { Injectable } from '@angular/core';
import { db } from '../../app.config';
import { collection, CollectionReference, DocumentData, getDocs, Query, QuerySnapshot } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { 

  }

  getData(collectionName: string): Observable<QuerySnapshot<DocumentData, DocumentData>> {
    const collectionRef = collection(db, collectionName);
    return this.getCollection(collectionRef)
  }

  private getCollection(collectionRef: CollectionReference<DocumentData, DocumentData>): Observable<QuerySnapshot<DocumentData, DocumentData>> {
    return new Observable<QuerySnapshot<DocumentData, DocumentData>>(observer => {
      getDocs(collectionRef).then(snapshot => {
        observer.next(snapshot);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

}
