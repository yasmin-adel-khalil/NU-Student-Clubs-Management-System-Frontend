import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: '<router-outlet></router-outlet>',
  standalone: true,
  imports: [RouterModule]
})
export class AuthComponent { }

@Component({
  selector: 'app-login',
  template: '<h1>Login</h1>',
  standalone: true
})
export class LoginComponent { }

@Component({
  selector: 'app-register',
  template: '<h1>Register</h1>',
  standalone: true
})
export class RegisterComponent { }

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
