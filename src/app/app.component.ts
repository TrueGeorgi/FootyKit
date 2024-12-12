import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/core/header/header.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from "./components/user/register/register.component";
import { LoginComponent } from './components/user/login/login.component';
import { AuthenticationService } from './services/user/authentication.service';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../environments/firebaseConfig';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    CommonModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private authService: AuthenticationService) {
    firebaseConfig
  }

}
