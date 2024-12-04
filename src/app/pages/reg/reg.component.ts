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
  ],
})
export class RegComponent {
  hide = signal(true);
  // formGroup!: FormGroup;
  clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  regForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.containUppercase,
        this.containsLowercase,
        this.containsNumber,
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: this.passwordsMatch }
  );

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
    const password = control.get('password')?.value.trim();
    const confirmPassword = control.get('confirmPassword')?.value.trim();
    return password && confirmPassword && password === confirmPassword
      ? null
      : { passwordMismatch: true };
  }

  containUppercase(control: AbstractControl): ValidationErrors | null {
    const hasUppercase = /[A-Z]/.test(control.value || '');
    return hasUppercase ? null : { noUppercase: true };
  }
  containsLowercase(control: AbstractControl): ValidationErrors | null {
    const hasLowercase = /[a-z]/.test(control.value || '');
    return hasLowercase ? null : { noLowercase: true };
  }
  containsNumber(control: AbstractControl): ValidationErrors | null {
    const hasNumber = /[0-9]/.test(control.value || '');
    return hasNumber ? null : { noNumber: true };
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
    console.warn(this.regForm);
    console.warn(this.regForm.errors);
  }
}
