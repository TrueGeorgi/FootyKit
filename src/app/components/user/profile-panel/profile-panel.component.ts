import { Component, EventEmitter, Output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { AuthenticationService } from '../../../services/user/authentication.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActiveUser } from '../../../models/ActiveUser';
import { PostItem } from '../../../models/PostItem';
import { PostItemService } from '../../../services/db/dbServices/post-item.service';


@Component({
  selector: 'app-profile-panel',
  imports: [MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './profile-panel.component.html',
  styleUrl: './profile-panel.component.scss'
})
export class ProfilePanelComponent {

  @Output() postedPostsEmit = new EventEmitter<PostItem[]>();

 nickname: FormControl = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(16)]);
 errorMessage = signal('');
 showConfirmDialog: boolean = false;
 postedPosts: PostItem[] = [];
 likedPosts: PostItem[] = [];

  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private postItemService: PostItemService
  ) {
       merge(this.nickname.statusChanges, this.nickname.valueChanges)
          .pipe(takeUntilDestroyed())
          .subscribe(() => this.updateErrorMessage(this.nickname));
  }

  ngOnInit() {
    this.postedPosts = this.postItemService.getPostItemsByCreator(this.authService.getUserEmail()!);
  }

  updateErrorMessage(control: FormControl<any>) {
    if (control.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (control.hasError('minlength')) {
      this.errorMessage.set('Nickname must be at least 6 characters long');
    } else if (control.hasError('maxlength')) {
      this.errorMessage.set('Nickname cannot exceed 50 characters');
    } else {
      this.errorMessage.set('');
    }
  }

  getEmail() {
    return this.authService.getUserEmail();
  }

 getOwnPosts() {
  this.router.navigate(['posted-posts'], {
    state: { postItems: this.postedPosts }
  });
}


  updateNickname() {
    if(this.nickname.valid) {
      this.authService.setNickname(this.nickname.value)
    }
    this.getNickname();
  }

  getNickname(): string | null {
    let nicknameCurrent = this.authService.getNickname();
    if(nicknameCurrent.length > 0) {
      return nicknameCurrent
    } else {
      return null
    }
  }

  openDeleteDialog() {
    this.showConfirmDialog = true;
  }

  cancelDelete() {
    this.showConfirmDialog = false;
  }

  deleteProfile() {
    this.authService.deleteProfile(this.authService.getUserId()!);
  }
}