import { Component } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { IconsService } from '../../services/icons.service';

@Component({
  selector: 'app-about-me',
  imports: [FontAwesomeModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  email: string = 'georgi.iliev9191@gmail.com'
  text: string = ' Hi! I\'m Georgi, a passionate software developer with a love for creating intuitive and engaging applications. I enjoy watching and playing football, which inspired me to create this Footy Kit app as a collector myself. Beyond coding, I love experimenting in the kitchen and diving into captivating audiobooks.'

  constructor(library: FaIconLibrary, private iconsService: IconsService) {
    library.addIcons(
      faGithub,
      faLinkedin
    );
  }

  getEnvelopeIcon() {
    return this.iconsService.faEnvelope;
  }
}
