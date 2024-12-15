import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegComponent } from './pages/reg/reg.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'reg',
    component: RegComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
