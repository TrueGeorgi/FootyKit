import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/user/authentication.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthenticationService) {

  }
  goLogin() {
    this.router.navigate(['login'])
  }

  goRegister() {
    this.router.navigate(['register'])
  }

  goHome() {
    this.router.navigate([''])
  }

  loggout() {
    this.authService.logout().then( () => {
        this.goHome();
      }
    );
    
  }

}
