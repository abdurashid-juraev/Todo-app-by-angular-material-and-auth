import { Component, inject } from '@angular/core';
import { TodoComponent } from '../../todo/todo.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoComponent, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private router = inject(Router);

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
