import { Component } from '@angular/core';
import { PostBoxComponent } from '../../components/shared/post-box/post-box.component';
import { PostItem } from '../../models/PostItem';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posted-posts',
  imports: [PostBoxComponent, CommonModule],
  templateUrl: './posted-posts.component.html',
  styleUrl: './posted-posts.component.scss'
})
export class PostedPostsComponent {
   postItems: PostItem[] = []

  constructor() {}

  ngOnInit(): void {
    if (history.state.postItems) {
      this.postItems = history.state.postItems;
    }
    
  }
  

}
