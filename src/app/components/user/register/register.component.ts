import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInputComponent } from "../../shared/email-input/email-input.component";
import { PasswordInputComponent } from "../../shared/password-input/password-input.component";
import { AuthenticationService } from '../../../services/user/authentication.service';
import { FormControl } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { IconsService } from '../../../services/icons.service';


@Component({
  selector: 'app-register',
  imports: [EmailInputComponent, PasswordInputComponent, CommonModule, FontAwesomeModule, MatTooltipModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private authService: AuthenticationService, private router: Router, private iconsService: IconsService) {
    
  }
  
_snackBar = inject(MatSnackBar);

passwordMessage: string = "Enter your password"
repeatPasswordMessage: string = "Repeat the password"

email: FormControl = new FormControl();
password: string = '';
repeatedPassword: string = '';

registrationMessage: string = '';
successfulRegistration: boolean = false;


register(): void {

  this.authService.register(this.email.value, this.password, this.repeatedPassword).subscribe(
    () => {
      this.router.navigate([''])
      this._snackBar.open('User registered successfully', 'OK')
    },
    (error) => {
      this._snackBar.open(error, 'OK')
      console.error('Registration error:', error);
    }
  )

}

onEmailChange(event: FormControl<string>) {
  this.email = event;
}

onPasswordChange(event: string) {
  this.password = event;
}

onRepeatPasswordChange(event: string) {
  this.repeatedPassword = event
}

isDisabled() {
  return this.email.invalid || !this.email.value;
}

@HostListener('document:keydown.enter', ['$event'])
onEnter(event: KeyboardEvent) {
  this.register();
}

getIconCircleInfo() {
  return this.iconsService.faCircleInfo;
}

}
