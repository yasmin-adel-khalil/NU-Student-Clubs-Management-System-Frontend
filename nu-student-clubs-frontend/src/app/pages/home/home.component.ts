import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <!-- Navigation Header -->
      <header class="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div class="flex items-center gap-2">
            <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
              NU
            </div>
            <div>
              <h1 class="font-bold text-slate-900">Student Clubs</h1>
              <p class="text-xs text-slate-500">Management System</p>
            </div>
          </div>
          <nav class="flex items-center gap-6">
            <a routerLink="/clubs" class="text-slate-600 hover:text-slate-900 font-medium">Clubs</a>
            <a routerLink="/dashboard" class="text-slate-600 hover:text-slate-900 font-medium">Dashboard</a>
            <button class="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700">
              Login
            </button>
          </nav>
        </div>
      </header>

      <!-- Hero Section -->
      <div class="mx-auto max-w-7xl px-6 py-20">
        <div class="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p class="text-sm font-semibold text-blue-600 mb-4">✓ Tailwind is active</p>
            <h2 class="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Organize, promote, and grow every student club in one place.
            </h2>
            <p class="text-lg text-slate-600 mb-8 leading-relaxed">
              Create events, manage memberships, and track engagement with a clean Angular + Tailwind setup.
            </p>
            <div class="flex items-center gap-4">
              <a routerLink="/dashboard" class="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition">
                View Dashboard
              </a>
              <a routerLink="/clubs" class="rounded-lg border-2 border-slate-300 px-6 py-3 text-slate-700 font-semibold hover:border-slate-400 hover:bg-slate-50 transition">
                Browse Clubs
              </a>
            </div>
          </div>

          <!-- Stats -->
          <div class="space-y-6">
            <!-- Upcoming Events Card -->
            <div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-semibold text-slate-900">Upcoming events</h3>
                <span class="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">Live</span>
              </div>
              <div class="space-y-4">
                <div class="flex gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold">
                    DEC 20
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900">Winter Hackathon</p>
                    <p class="text-sm text-slate-600">Tech Club • Lab 3 • 5:00 PM</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 font-bold">
                    DEC 22
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900">Art & Culture Night</p>
                    <p class="text-sm text-slate-600">Arts Club • Auditorium • 7:30 PM</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 font-bold">
                    DEC 24
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900">Community Service Drive</p>
                    <p class="text-sm text-slate-600">Outreach Club • City Center • 9:00 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-3 gap-4">
              <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm text-center">
                <p class="text-2xl font-bold text-slate-900">48</p>
                <p class="text-xs text-slate-600">Active clubs</p>
              </div>
              <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm text-center">
                <p class="text-2xl font-bold text-slate-900">120</p>
                <p class="text-xs text-slate-600">Events this term</p>
              </div>
              <div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm text-center">
                <p class="text-2xl font-bold text-slate-900">3.2k</p>
                <p class="text-xs text-slate-600">Members engaged</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
