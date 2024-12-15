import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input'
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../services/user/authentication.service';
import { IconsService } from '../../../services/icons.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PostItem } from '../../../models/PostItem';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { PostItemService } from '../../../services/db/dbServices/post-item.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-post-box',
  imports: [MatGridListModule, MatInputModule, CommonModule, FontAwesomeModule, MatTooltipModule, ReactiveFormsModule],
  templateUrl: './post-box.component.html',
  styleUrl: './post-box.component.scss'
})
export class PostBoxComponent {
  @Input() postItem: PostItem;
  @Input() showPath: boolean;
  @Input() showDelete: boolean;

  showConfirmDialog: boolean = false;
  comment: FormControl<string | null> = new FormControl('');

  constructor(
    private authService: AuthenticationService, 
    private iconsService: IconsService, 
    private router: Router,
    private postItemService: PostItemService
  ) { }


  existUser(): boolean {
    return this.authService.isLogged();
  }

  getIconThumbsUp(): IconDefinition {
    return this.iconsService.faThumbsUp;
  }

  getIconThumbsDown(): IconDefinition {
    return this.iconsService.faThumbsDown;
  }

  getLikesDifference(): number {
    // console.log(this.postItem.likedBy.length);
    // console.log(this.postItem.dislikedBy.length);
    
    return this.postItem.likedBy.length - this.postItem.dislikedBy.length;
  }

  goToSinglePage(): void {
    this.postItemService.setLocalPost(this.postItem);
    this.router.navigate(['home', this.postItem.id])
  }

  getTrashCan(): IconDefinition {
    return this.iconsService.faTrashCan;
  }

  openDialog(): void {
    this.showConfirmDialog = true;
  }

  deletePost(postItemId: string): void {
    this.postItemService.deletePost(postItemId).subscribe(() => {
      this.showConfirmDialog = false;
      this.router.navigate(['profile'])
    }, 
    (error) => {
      console.log('item was not deleted');
    })
  }

  cancelDelete(): void {
    this.showConfirmDialog = false;
  }

  like(): void {
    const userId = this.authService.getUserId()!;
    
    this.postItem.dislikedBy = this.postItem.dislikedBy.filter(d => d !== userId);
  
    if (this.postItem.likedBy.includes(userId)) {
      this.postItem.likedBy = this.postItem.likedBy.filter(l => l !== userId);
    } else {
      this.postItem.likedBy.push(userId);
    }
  
    this.postItemService.editPost(this.postItem);
  }
  
  dislike(): void {
    const userId = this.authService.getUserId()!;
    
    this.postItem.likedBy = this.postItem.likedBy.filter(l => l !== userId);
  
    if (this.postItem.dislikedBy.includes(userId)) {
      this.postItem.dislikedBy = this.postItem.dislikedBy.filter(d => d !== userId);
    } else {
      this.postItem.dislikedBy.push(userId);
    }
  
    this.postItemService.editPost(this.postItem);
  }

  getLastComment(): string | null {
    if(this.postItem.comments.length !== 0) {
      return this.postItem.comments[this.postItem.comments.length - 1]
    }
    return null
  }

  addComment(): void {

    if(this.comment.value !== null && this.comment.value.trim().length > 0) {
      console.log('Is in');
      
      this.postItem.comments.push(this.comment.value)
      this.postItemService.editPost(this.postItem);
      this.comment.reset();
    }
    
  }

  getBeforeLastComment(): string | null {
    if(this.postItem.comments.length > 1) {
      return this.postItem.comments[this.postItem.comments.length - 2]
    }
    return null
  }
}
