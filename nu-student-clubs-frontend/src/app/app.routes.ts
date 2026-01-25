import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    redirectTo: 'admin'
  },
  {
    path: 'clubs',
    loadComponent: () => import('./pages/clubs/club-list.component').then(m => m.ClubListComponent)
  },
  {
    path: 'events',
    loadComponent: () => import('./pages/events/event-list.component').then(m => m.EventListComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
