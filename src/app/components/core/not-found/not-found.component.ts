import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsService } from '../../../services/icons.service';

@Component({
  selector: 'app-not-found',
  imports: [FontAwesomeModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  constructor(private iconsService: IconsService) {

  }

  getBanIcon() {
    return this.iconsService.faBan;
  }
}
