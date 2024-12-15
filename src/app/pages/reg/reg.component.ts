import { Component, inject, signal } from '@angular/core';
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
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../service/auth.service';
import { RegisterPostData } from '../../models/models';
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
    RouterModule,
    MatCardModule,
  ],
})
export class RegComponent {
  constructor(private router: Router) {}
  private registerServise = inject(AuthService);
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
    if (!value) return null;
    const errors: ValidationErrors = {};

    if (!/[A-Z]/.test(value)) {
      errors['containUppercase'] =
        'Password must contain at least one uppercase letter.';
    } else if (!/[a-z]/.test(value)) {
      errors['containLowercase'] =
        'Password must contain at least one lowercase letter.';
    } else if (!/[0-9]/.test(value)) {
      errors['containNumber'] = 'Password must contain at least one number.';
    }
    return Object.keys(errors).length ? errors : null;
  }

  trimTab(): void {
    const usernameControl = this.regForm.get('username');
    const emailControl = this.regForm.get('email');

    if (usernameControl && usernameControl.value) {
      usernameControl.setValue(usernameControl.value.trim());
    }

    if (emailControl && emailControl.value) {
      emailControl.setValue(emailControl.value.trim());
    }
  }
  onSubmit(): void {
    this.trimTab();
    const postData = { ...this.regForm.value };
    delete postData.confirmPassword;
    this.registerServise.registerUser(postData as RegisterPostData).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
    console.warn(this.regForm.errors);
  }
}
