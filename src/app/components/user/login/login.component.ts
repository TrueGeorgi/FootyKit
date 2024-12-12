import { Component, HostListener, inject } from '@angular/core';
import { AuthenticationService } from '../../../services/user/authentication.service';
import { FormControl } from '@angular/forms';
import { EmailInputComponent } from '../../shared/email-input/email-input.component';
import { PasswordInputComponent } from '../../shared/password-input/password-input.component';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  imports: [EmailInputComponent, PasswordInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
constructor(private authService: AuthenticationService, private router: Router) {
    
}
private _snackBar = inject(MatSnackBar)

email: FormControl = new FormControl()
password: string = '';

login(): void {
 this.authService.login(this.email.value, this.password)
 .subscribe(() => {
  this.router.navigate(['home'])
 }, (error: any) => {
  this._snackBar.open('Invalid credentials', 'OK')
 });
  
}

onEmailChange(event: FormControl<string>) {
  this.email = event;
}

onPasswordChange(event: string) {
  this.password = event;  
}

isDisabled() {
  return this.email.invalid || !this.email.value;
}

@HostListener('document:keydown.enter', ['$event'])
onEnter(event: KeyboardEvent) {
  this.login();
}
}