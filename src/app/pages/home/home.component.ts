import { Component, OnInit } from '@angular/core';
import { PostBoxComponent } from '../../components/shared/post-box/post-box.component';
import { PostItem } from '../../models/PostItem';
import { PostItemService } from '../../services/db/dbServices/post-item.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [PostBoxComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  postItems: PostItem[] = []

  constructor(private postItemService: PostItemService) {}

  ngOnInit(): void {
    this.postItems = this.postItemService.getPostItems();
  }

}
