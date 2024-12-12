import {ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-password-input',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule, FormsModule, CommonModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent {

  @Input() passwordMessage: String = '';
  @Output() passwordChange = new EventEmitter<string>();
  
  password: string = '';

  hide = signal(true);
  
  changeInputView(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onPasswordChange() {
    this.passwordChange.emit(this.password);
  }

}
