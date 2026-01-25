import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main class="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 text-slate-900">
      <!-- Header/Navigation -->
      <header class="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white text-lg font-semibold">NU</span>
            <div>
              <p class="text-xs font-medium text-slate-500">Student Clubs</p>
              <p class="text-sm font-bold text-slate-900">Management System</p>
            </div>
          </div>
          
          <nav class="hidden items-center gap-2 text-sm font-medium text-slate-600 lg:flex">
            <a routerLink="/dashboard" class="px-3 py-2 rounded-lg hover:bg-slate-100 transition">Dashboard</a>
            <a routerLink="/clubs" class="px-3 py-2 rounded-lg hover:bg-slate-100 transition">Clubs</a>
            <a routerLink="/events" class="px-3 py-2 rounded-lg hover:bg-slate-100 transition">Events</a>
          </nav>

          <div class="flex items-center gap-3">
            <a
              routerLink="/auth/login"
              class="rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition"
            >
              Sign in
            </a>
            <a
              routerLink="/auth/register"
              class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
            >
              Sign up
            </a>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div class="space-y-8">
          <div>
            <p class="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 mb-4">
              🎓 Organize student life at NU
            </p>
            <h1 class="text-5xl font-bold leading-tight lg:text-6xl">
              Connect, organize, and grow every <span class="text-blue-600">student club</span>
            </h1>
          </div>
          
          <p class="text-lg text-slate-600 max-w-lg">
            Manage events, track memberships, and engage your community in one centralized platform.
            Built by students, for students at Nile University.
          </p>

          <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              routerLink="/auth/login"
              class="rounded-lg bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a
              routerLink="/clubs"
              class="rounded-lg border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition"
            >
              Explore Clubs
            </a>
          </div>

          <div class="grid grid-cols-3 gap-4 pt-4">
            <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition">
              <p class="text-2xl font-bold text-blue-600">48</p>
              <p class="text-xs text-slate-600">Active Clubs</p>
            </div>
            <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition">
              <p class="text-2xl font-bold text-purple-600">156</p>
              <p class="text-xs text-slate-600">Events/Year</p>
            </div>
            <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition">
              <p class="text-2xl font-bold text-emerald-600">3.2k</p>
              <p class="text-xs text-slate-600">Members</p>
            </div>
          </div>
        </div>

        <!-- Feature Cards -->
        <div class="grid gap-4">
          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition">
            <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <span class="text-xl">📅</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 mb-2">Event Management</h3>
            <p class="text-xs text-slate-600">Create, promote, and track all your club events in one place.</p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition">
            <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <span class="text-xl">👥</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 mb-2">Member Tracking</h3>
            <p class="text-xs text-slate-600">Keep track of who's interested and who's active in your club.</p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition">
            <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
              <span class="text-xl">📸</span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 mb-2">Photo Gallery</h3>
            <p class="text-xs text-slate-600">Share memories and showcase your club's activities.</p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-slate-200 bg-white py-8 mt-12">
        <div class="mx-auto max-w-6xl px-6 text-center text-sm text-slate-600">
          <p>© 2025 NU Student Clubs Management System. All rights reserved.</p>
        </div>
      </footer>
    </main>
  `,
})
export class HomeComponent {}
