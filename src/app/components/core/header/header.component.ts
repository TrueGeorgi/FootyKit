import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/user/authentication.service';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { IconsService } from '../../../services/icons.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, CommonModule, FontAwesomeModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthenticationService, private iconsService: IconsService) {

  }
  goLogin(): void {
    this.router.navigate(['login'])
  }

  goRegister(): void {
    this.router.navigate(['register'])
  }

  goHome(): void {
    this.router.navigate([''])
  }

  goToCreate(): void {
    this.router.navigate(['createPost'])
  }

  goToUserProfile(): void {
    this.router.navigate(['profile'])
  }

  logout(): void {
    this.authService.logout().subscribe( () => {
        this.goHome();
      }
    );
    
  }

  existUser(): boolean {
    return this.authService.isLogged();
  }

  getSquarePlusIcon(): IconDefinition {
    return this.iconsService.faSquarePlus;
  }

  getUserIcon(): IconDefinition {
    return this.iconsService.faUser;
  }

}
