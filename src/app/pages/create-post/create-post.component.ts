import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthenticationService } from '../../services/user/authentication.service';
import { PostItemPostDTO } from '../../models/DTOs/PostItemPostDTO';
import { PostItemService } from '../../services/db/dbServices/post-item.service';
import { PostItem } from '../../models/PostItem';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';




@Component({
  selector: 'app-create-post',
  imports: [MatInputModule, MatButtonModule, FormsModule, CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  title: FormControl = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]);
  url: FormControl = new FormControl('', Validators.required);
  errorMessage: WritableSignal<string> = signal('');
  private _snackbar: MatSnackBar = inject(MatSnackBar);

  constructor(private authService: AuthenticationService, private postItemService: PostItemService, private router: Router) {
       merge(this.title.statusChanges, this.title.valueChanges)
          .pipe(takeUntilDestroyed())
          .subscribe(() => this.updateErrorMessage(this.title));

        merge(this.url.statusChanges, this.url.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage(this.url));
  }

  updateErrorMessage(control: FormControl<any>): void {
    if (control.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (control.hasError('minlength')) {
      this.errorMessage.set('Title must be at least 6 characters long');
    } else if (control.hasError('maxlength')) {
      this.errorMessage.set('Title cannot exceed 50 characters');
    } else {
      this.errorMessage.set('');
    }
  }

  post(): void {
    if (this.title.valid && this.url.valid) {
      let postItemDTO: PostItemPostDTO = {
        name: this.title.value,
        img: this.url.value,
        creator: this.authService.getUserEmail(),
        likedBy: [],
        dislikedBy: [],
        comments: []
      };

      this.postItemService.addPostItem(postItemDTO).subscribe(addedItemId => {
        let postItem: PostItem = {
          id: addedItemId,
          name: this.title.value,
          img: this.url.value,
          likedBy: [],
          dislikedBy: [],
          creator: this.authService.getUserEmail(),
          comments: []
        }

        this.postItemService.addPost(postItem);
        this.title.reset();
        this.url.reset();
        this.router.navigate([''])
      })

      this._snackbar.open('Post successfully posted', 'OK')
    } else {
      this.showUnable();
    }
  }

  showUnable(): void {

  }
}
