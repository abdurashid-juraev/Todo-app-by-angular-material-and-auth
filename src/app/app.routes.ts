import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegComponent } from './pages/reg/reg.component';

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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
