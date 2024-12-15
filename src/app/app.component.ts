import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
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
      // console.log(data);
    });
  }
}
