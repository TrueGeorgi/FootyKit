import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { DbService } from '../../../services/db/db.service';
import { PostItemService } from '../../../services/db/dbServices/post-item.service';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, MatIconModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(library: FaIconLibrary, private postItemService: PostItemService) {
    library.addIcons(
      faGithub
    );
  }

  test() {
    this.postItemService.getPostItems();
  }
}
