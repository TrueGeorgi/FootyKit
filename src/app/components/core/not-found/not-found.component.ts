import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsService } from '../../../services/icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found',
  imports: [FontAwesomeModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private iconsService: IconsService) {

  }

  getBanIcon(): IconDefinition {
    return this.iconsService.faBan;
  }
}
