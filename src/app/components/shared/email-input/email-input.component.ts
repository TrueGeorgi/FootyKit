import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, Output, EventEmitter, WritableSignal } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Form, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';

@Component({
  selector: 'app-email-input',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.scss'
})
export class EmailInputComponent {
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);

  @Output() emailChange: EventEmitter<FormControl<any>> = new EventEmitter<FormControl>();

  errorMessage: WritableSignal<string> = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage(): void {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  onEmailChange(): void {
    this.emailChange.emit(this.email);
  }
}
