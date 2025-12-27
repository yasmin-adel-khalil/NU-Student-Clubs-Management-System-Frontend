import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <main class="min-h-screen bg-slate-50 text-slate-900">
      <section class="mx-auto grid max-w-5xl gap-8 px-6 py-12 sm:grid-cols-2 sm:items-center">
        <div class="space-y-6">
          <div class="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Tailwind is active
          </div>
          <h1 class="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Organize, promote, and grow every student club in one place.
          </h1>
          <p class="text-lg text-slate-600">
            Create events, manage memberships, and track engagement with a clean Angular + Tailwind setup.
          </p>
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button class="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
              View Dashboard
            </button>
            <button class="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-slate-300">
              Browse Clubs
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4 text-sm text-slate-600 sm:grid-cols-3">
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p class="text-2xl font-bold text-slate-900">48</p>
              <p>Active clubs</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p class="text-2xl font-bold text-slate-900">120</p>
              <p>Events this term</p>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p class="text-2xl font-bold text-slate-900">3.2k</p>
              <p>Members engaged</p>
            </div>
          </div>
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-blue-100">
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold text-slate-700">Upcoming events</p>
            <span class="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">Live</span>
          </div>
          <div class="mt-4 space-y-3">
            <div class="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div class="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white">DEC 20</div>
              <div>
                <p class="text-sm font-semibold text-slate-900">Winter Hackathon</p>
                <p class="text-sm text-slate-600">Tech Club • Lab 3 • 5:00 PM</p>
              </div>
            </div>
            <div class="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div class="rounded-lg bg-purple-600 px-3 py-2 text-xs font-bold text-white">DEC 22</div>
              <div>
                <p class="text-sm font-semibold text-slate-900">Art & Culture Night</p>
                <p class="text-sm text-slate-600">Arts Club • Auditorium • 7:30 PM</p>
              </div>
            </div>
            <div class="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div class="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white">DEC 24</div>
              <div>
                <p class="text-sm font-semibold text-slate-900">Community Service Drive</p>
                <p class="text-sm text-slate-600">Outreach Club • City Center • 9:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  `
})
export class DashboardComponent {}

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
