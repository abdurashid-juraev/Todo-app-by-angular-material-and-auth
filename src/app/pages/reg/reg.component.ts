import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-reg',
  standalone: true,
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterLink,
  ],
})
export class RegComponent {
  hide = signal(true);
  hideConfirm = signal(true);
  clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  clickEventConfirm(event: MouseEvent): void {
    this.hideConfirm.set(!this.hideConfirm());
    event.stopPropagation();
  }
  regForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.passwordValidators,
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordsMatch }
  );

  get usernameControl() {
    return this.regForm.get('username');
  }
  get emailControl() {
    return this.regForm.get('email');
  }

  get passwordControl() {
    return this.regForm.get('password');
  }
  get confirmPasswordControl() {
    return this.regForm.get('confirmPassword');
  }
  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }
  passwordValidators(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const errors: ValidationErrors = {};

    if (!/[A-Z]/.test(value)) {
      errors['containUppercase'] =
        'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(value)) {
      errors['containLowercase'] =
        'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(value)) {
      errors['containNumber'] = 'Password must contain at least one number.';
    }
    return Object.keys(errors).length ? errors : null;
  }

  onSubmit(): void {
    const usernameControl = this.regForm.get('username');
    const emailControl = this.regForm.get('email');

    if (usernameControl && usernameControl.value) {
      usernameControl.setValue(usernameControl.value.trim());
    }

    if (emailControl && emailControl.value) {
      emailControl.setValue(emailControl.value.trim());
    }
    console.warn(this.regForm.errors);
  }
}
