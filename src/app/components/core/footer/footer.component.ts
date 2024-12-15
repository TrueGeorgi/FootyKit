import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { DbService } from '../../../services/db/db.service';
import { PostItemService } from '../../../services/db/dbServices/post-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, MatIconModule, FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(library: FaIconLibrary, private postItemService: PostItemService, private router: Router) {
    library.addIcons(
      faGithub
    );
  }

  goToAboutMe(): void {
    this.router.navigate(['about-me'])
  }
}
