import { RegComponent } from './pages/reg/reg.component';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RegComponent, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-app';
  users: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get('http://localhost:3000/users').subscribe((data: any) => {
      this.users = data;
      console.log(data);
    });
  }
}
