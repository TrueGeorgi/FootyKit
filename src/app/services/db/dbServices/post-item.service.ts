import { Injectable } from '@angular/core';
import { DbService } from '../db.service';
import { Observable } from 'rxjs';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { PostItem } from '../../../models/PostItem';

@Injectable({
  providedIn: 'root'
})



export class PostItemService {
private COLLECTION_NAME: string = 'post_items';

private posts$: PostItem[] = [];
  

  constructor(private dbService: DbService) {

  }

  

 

  getPostItems(): PostItem[] {
   this.dbService.getData(this.COLLECTION_NAME).subscribe(
    (snapshot) => {
      snapshot.forEach(doc => {
        // console.log(doc.id, ' => ', doc.data());
        
        const postItem = {
          id: doc.id,
          name: doc.data()['name'],
          img: doc.data()['img'],
          likes: doc.data()['likes'],
          dislikes: doc.data()['dislikes']
        }

        this.posts$.push(postItem);
      })
    },
    (error: any) => {console.log(error)}
   )
      return this.posts$
      
  }
 
}
