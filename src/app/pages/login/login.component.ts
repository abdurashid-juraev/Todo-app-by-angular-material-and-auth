import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    RouterLink,
    MatCardModule,
  ],
})
export class LoginComponent {
  hide = signal(true);
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  clickEvent(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }
  trimTab(): void {
    if (this.emailControl && this.emailControl.value) {
      this.emailControl.setValue(this.emailControl.value.trim());
    }
  }
  private authService = inject(AuthService);
  private router = inject(Router);
  onSubmit(): void {
    this.trimTab();
    const { email, password } = this.loginForm.value;
    this.authService.getUserDetails(email!, password!).subscribe({
      next: (res) => {
        if (res.length >= 1) {
          sessionStorage.setItem('email', email!);
          this.router.navigate(['home']);
        } else {
          alert('Invalid email or password');
          this.router.navigate(['login']);
        }
      },
    });
    // console.log(this.loginForm);
  }
}
