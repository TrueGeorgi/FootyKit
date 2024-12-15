import { Injectable } from '@angular/core';
import { DbService } from '../db.service';
import { PostItem } from '../../../models/PostItem';
import { PostItemPostDTO } from '../../../models/DTOs/PostItemPostDTO';
import { from, Observable } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../app.config';

@Injectable({
  providedIn: 'root'
})



export class PostItemService {
private COLLECTION_NAME: string = 'post_items';

private posts$: PostItem[] = [];
private singlePost$: PostItem;

private selectedPost: PostItem;
  

  constructor(private dbService: DbService) {

  }

  getPostItems(): PostItem[] {
    this.posts$ = []
   this.dbService.getData(this.COLLECTION_NAME).subscribe(
    (snapshot) => {
      snapshot.forEach(doc => {
        this.singlePost$ = {
          id: doc.id,
          name: doc.data()['name'],
          img: doc.data()['img'],
          likedBy: doc.data()['likedBy'],
          dislikedBy: doc.data()['dislikedBy'],
          creator: doc.data()['creator'],
          comments: doc.data()['comments']
        }

        this.posts$.push(this.singlePost$);
      })
    },
    (error: any) => {console.log(error)}
   )
      return this.posts$
      
  }

  getPostItemsByCreator(email: string): PostItem[] {
    this.posts$ = []
   this.dbService.getData(this.COLLECTION_NAME).subscribe(
    (snapshot) => {
      snapshot.forEach(doc => {
        if(email === doc.data()['creator']) {
          this.singlePost$ = {
            id: doc.id,
            name: doc.data()['name'],
            img: doc.data()['img'],
            likedBy: doc.data()['likedBy'],
            dislikedBy: doc.data()['dislikedBy'],
            creator: doc.data()['creator'],
            comments: doc.data()['comments']
          }

          this.posts$.push(this.singlePost$);
        }
      })
    },
    (error: any) => {console.log(error)}
   )
      return this.posts$
      
  }


  

  addPostItem(postItemDTO: PostItemPostDTO): Observable<string> {
    const promise = addDoc(collection(db, this.COLLECTION_NAME), postItemDTO).then((response) => response.id);
    return from(promise)
  }

  setLocalPost(post: PostItem): void {
    this.selectedPost = post;
  }

  getLocalPost(): PostItem {
    return this.selectedPost;
  } 

  addPost(postItem: PostItem): void {
    this.posts$.push(postItem);
  }

  deletePost(id: string): Observable<boolean> {
    const postRef = doc(collection(db, this.COLLECTION_NAME), id);
    return from(
      deleteDoc(postRef).then(() => {
        console.log("Document successfully deleted!");
        return true;
      }).catch((error) => {
        console.error("Error deleting document: ", error);
        return false;
      })
    );
  }

  editPost(postItem: PostItem): Observable<void> {
    const docRef = doc(collection(db, this.COLLECTION_NAME), postItem.id);
    console.log(postItem);
    
   
    let dto: PostItemPostDTO = {
      name: postItem.name,
      img: postItem.img,
      creator: postItem.creator,
      likedBy: postItem.likedBy,
      dislikedBy: postItem.dislikedBy,
      comments: postItem.comments
    } 
    const promise = setDoc(docRef, dto);
    return from(promise);
  }
}
