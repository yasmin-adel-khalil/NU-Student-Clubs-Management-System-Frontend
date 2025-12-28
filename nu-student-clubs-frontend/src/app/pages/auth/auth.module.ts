import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700 text-white">
      <div class="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center">
        <div class="space-y-5">
          <p class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100 ring-1 ring-white/20">
            Secure access for NU students
          </p>
          <h1 class="text-4xl font-bold leading-tight sm:text-5xl">Welcome back to NU Clubs</h1>
          <p class="max-w-xl text-base text-blue-100 sm:text-lg">
            Manage events, clubs, and memberships with your NU email account. Use your campus address
            that ends with @nu.edu.eg to sign in or create a new account.
          </p>
          <div class="flex flex-wrap gap-3 text-sm text-blue-100">
            <span class="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">@nu.edu.eg only</span>
            <span class="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">Single campus identity</span>
            <span class="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/10">Fast onboarding</span>
          </div>
        </div>

        <div class="w-full">
          <div class="rounded-2xl bg-white p-8 shadow-2xl shadow-blue-500/10 ring-1 ring-slate-100">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AuthComponent { }

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="space-y-6">
      <header class="space-y-1">
        <p class="text-sm font-semibold text-blue-700">Login</p>
        <h2 class="text-2xl font-bold text-slate-900">Access your account</h2>
        <p class="text-sm text-slate-600">Use your NU email (must end with @nu.edu.eg).</p>
      </header>

      <form class="space-y-5" [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700" for="login-email">NU Email</label>
          <input
            id="login-email"
            type="email"
            formControlName="email"
            placeholder="you@nu.edu.eg"
            class="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <div class="text-xs text-red-600" *ngIf="isInvalid(loginForm, 'email')">
            <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required.</span>
            <span *ngIf="loginForm.get('email')?.errors?.['pattern']">Email must end with @nu.edu.eg.</span>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700" for="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            formControlName="password"
            placeholder="••••••••"
            class="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <div class="text-xs text-red-600" *ngIf="isInvalid(loginForm, 'password')">
            <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required.</span>
            <span *ngIf="loginForm.get('password')?.errors?.['minlength']">Minimum 6 characters.</span>
          </div>
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="inline-flex items-center gap-2 text-slate-700">
            <input type="checkbox" formControlName="remember" class="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span>Remember me</span>
          </label>
          <a class="font-semibold text-blue-700 hover:text-blue-800" href="#">Forgot password?</a>
        </div>

        <button
          type="submit"
          class="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Sign in
        </button>
      </form>

      <p class="text-center text-sm text-slate-600">
        New here?
        <a routerLink="/auth/register" class="font-semibold text-blue-700 hover:text-blue-800">Create an account</a>
      </p>
    </div>
  `
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  private readonly emailPattern = /^[A-Za-z0-9._%+-]+@nu\.edu\.eg$/;

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [true]
  });

  isInvalid(form: ReturnType<typeof this.fb.group>, controlName: string): boolean {
    const control = form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    this.auth.login(email as string, password as string).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        const msg = err?.error?.message || 'Login failed';
        alert(msg);
      }
    });
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="space-y-6">
      <header class="space-y-1">
        <p class="text-sm font-semibold text-blue-700">Sign up</p>
        <h2 class="text-2xl font-bold text-slate-900">Create your NU account</h2>
        <p class="text-sm text-slate-600">Use your campus email that ends with @nu.edu.eg.</p>
      </header>

      <form class="space-y-4" [formGroup]="registerForm" (ngSubmit)="onSubmit()" novalidate>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700" for="first-name">First name</label>
            <input
              id="first-name"
              type="text"
              formControlName="firstName"
              placeholder="Omar"
              class="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <div class="text-xs text-red-600" *ngIf="isInvalid(registerForm, 'firstName')">
              <span>First name is required.</span>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-700" for="last-name">Last name</label>
            <input
              id="last-name"
              type="text"
              formControlName="lastName"
              placeholder="Saleh"
              class="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <div class="text-xs text-red-600" *ngIf="isInvalid(registerForm, 'lastName')">
              <span>Last name is required.</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700" for="register-email">NU Email</label>
          <input
            id="register-email"
            type="email"
            formControlName="email"
            placeholder="you@nu.edu.eg"
            class="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <div class="text-xs text-red-600" *ngIf="isInvalid(registerForm, 'email')">
            <span *ngIf="registerForm.get('email')?.errors?.['required']">Email is required.</span>
            <span *ngIf="registerForm.get('email')?.errors?.['pattern']">Email must end with @nu.edu.eg.</span>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700" for="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            formControlName="phone"
            placeholder="01XXXXXXXXX"
            class="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <div class="text-xs text-red-600" *ngIf="isInvalid(registerForm, 'phone')">
            <span *ngIf="registerForm.get('phone')?.errors?.['required']">Phone number is required.</span>
            <span *ngIf="registerForm.get('phone')?.errors?.['pattern']">Enter an 11-digit phone number.</span>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-700" for="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            formControlName="password"
            placeholder="••••••••"
            class="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <div class="text-xs text-red-600" *ngIf="isInvalid(registerForm, 'password')">
            <span *ngIf="registerForm.get('password')?.errors?.['required']">Password is required.</span>
            <span *ngIf="registerForm.get('password')?.errors?.['minlength']">Minimum 6 characters.</span>
          </div>
        </div>

        <button
          type="submit"
          class="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Create account
        </button>
      </form>

      <p class="text-center text-sm text-slate-600">
        Already have an account?
        <a routerLink="/auth/login" class="font-semibold text-blue-700 hover:text-blue-800">Sign in</a>
      </p>
    </div>
  `
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  private readonly emailPattern = /^[A-Za-z0-9._%+-]+@nu\.edu\.eg$/;
  private readonly phonePattern = /^\d{11}$/;

  readonly registerForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isInvalid(form: ReturnType<typeof this.fb.group>, controlName: string): boolean {
    const control = form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const payload = this.registerForm.value;
    this.auth.signup(payload).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => {
        const msg = err?.error?.message || 'Signup failed';
        alert(msg);
      }
    });
  }
}

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
