import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Event } from '../../shared/models/event.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <section class="max-w-5xl mx-auto p-4 space-y-6">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-semibold">Events</h1>
        <p class="text-sm text-gray-600">Browse upcoming events and add new ones.</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <article *ngFor="let evt of events" class="rounded-lg border bg-white shadow-sm p-4 flex flex-col gap-2">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">{{ evt.title }}</h2>
              <p class="text-sm text-gray-600">{{ evt.location }}</p>
            </div>
            <span class="text-sm text-indigo-700 font-medium">
              {{ getEventDate(evt) | date: 'mediumDate' }}
            </span>
          </div>
          <p class="text-sm text-gray-700" *ngIf="evt.description">{{ evt.description }}</p>
        </article>
        <div *ngIf="!events.length && !loading" class="col-span-full text-sm text-gray-600">No events available.</div>
        <div *ngIf="loading" class="col-span-full text-sm text-gray-600">Loading events…</div>
      </div>

      <div class="rounded-lg border bg-white shadow-sm p-5">
        <h2 class="text-xl font-semibold mb-3">Create Event</h2>
        <form [formGroup]="form" (ngSubmit)="createEvent()" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="block space-y-1">
              <span class="text-sm font-medium">Title</span>
              <input type="text" formControlName="title" class="w-full rounded border p-2" placeholder="Event title" />
              <span *ngIf="isInvalid('title')" class="text-xs text-red-600">Title is required.</span>
            </label>

            <label class="block space-y-1">
              <span class="text-sm font-medium">Location</span>
              <input type="text" formControlName="location" class="w-full rounded border p-2" placeholder="Event location" />
              <span *ngIf="isInvalid('location')" class="text-xs text-red-600">Location is required.</span>
            </label>

            <label class="block space-y-1">
              <span class="text-sm font-medium">Event Date</span>
              <input type="date" formControlName="eventDate" class="w-full rounded border p-2" />
              <span *ngIf="isInvalid('eventDate')" class="text-xs text-red-600">Event date is required.</span>
            </label>

            <label class="block space-y-1">
              <span class="text-sm font-medium">Club ID</span>
              <input type="text" formControlName="clubId" class="w-full rounded border p-2" placeholder="Club identifier" />
              <span *ngIf="isInvalid('clubId')" class="text-xs text-red-600">Club ID is required.</span>
            </label>
          </div>

          <label class="block space-y-1">
            <span class="text-sm font-medium">Description</span>
            <textarea formControlName="description" rows="3" class="w-full rounded border p-2" placeholder="Event description"></textarea>
          </label>

          <div class="flex items-center gap-3">
            <button type="submit" [disabled]="form.invalid || submitting" class="px-4 py-2 rounded bg-indigo-600 text-white disabled:bg-gray-400">
              {{ submitting ? 'Creating…' : 'Create Event' }}
            </button>
            <span *ngIf="successMessage" class="text-sm text-green-600">{{ successMessage }}</span>
            <span *ngIf="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</span>
          </div>
        </form>
      </div>
    </section>
  `
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  loading = false;
  submitting = false;
  successMessage = '';
  errorMessage = '';
  form!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      eventDate: ['', Validators.required],
      clubId: ['', Validators.required]
    });
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    this.http.get<Event[]>(`${environment.apiBaseUrl}/events`).subscribe({
      next: data => {
        this.events = data || [];
        this.loading = false;
      },
      error: () => {
        this.events = [];
        this.loading = false;
        this.errorMessage = 'Could not load events';
      }
    });
  }

  getEventDate(evt: Event): Date | string | null {
    const raw = (evt as any).eventDate ?? (evt as any).startDate;
    return raw || null;
  }

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  createEvent(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const { title, description, location, eventDate, clubId } = this.form.value;
    const payload = {
      title,
      description,
      location,
      eventDate: eventDate ? new Date(eventDate).toISOString() : null,
      clubId
    };

    this.http.post(`${environment.apiBaseUrl}/events`, payload).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Event created successfully';
        this.form.reset();
        this.loadEvents();
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = 'Failed to create event';
      }
    });
  }
}
