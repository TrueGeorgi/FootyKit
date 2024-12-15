import { Component, Input } from '@angular/core';
import { PostBoxComponent } from '../../components/shared/post-box/post-box.component';
import { PostItem } from '../../models/PostItem';
import { PostItemService } from '../../services/db/dbServices/post-item.service';

@Component({
  selector: 'app-single-post',
  imports: [PostBoxComponent],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})
export class SinglePostComponent {
    postItem: PostItem;

    constructor(private postItemService: PostItemService) {}

    ngOnInit(): void {
      this.postItem = this.postItemService.getLocalPost();
    }
}
