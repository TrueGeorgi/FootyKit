import { Component, Input, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input'
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../services/user/authentication.service';
import { IconsService } from '../../../services/icons.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PostItem } from '../../../models/PostItem';



@Component({
  selector: 'app-post-box',
  imports: [MatGridListModule, MatInputModule, CommonModule, FontAwesomeModule, MatTooltipModule],
  templateUrl: './post-box.component.html',
  styleUrl: './post-box.component.scss'
})
export class PostBoxComponent {
  @Input() postItem: PostItem;
  // @Input() oh: number;

  constructor(private authService: AuthenticationService, private iconsService: IconsService) {
    
    
  }


  existUser() {
    return this.authService.isLogged();
  }

  getIconThumbsUp() {
    return this.iconsService.faThumbsUp;
  }

  getIconThumbsDown() {
    return this.iconsService.faThumbsDown;
  }

  getLikesDifference(): number {
    return this.postItem.likes - this.postItem.dislikes;
  }
}
