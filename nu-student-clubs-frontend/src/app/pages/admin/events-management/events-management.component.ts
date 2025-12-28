import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EventService, Event } from '../../../core/services/event.service';

@Component({
  selector: 'app-events-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="min-h-screen bg-slate-50 p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900">Events Management</h1>
        <p class="mt-2 text-slate-600">Create and manage student events</p>
      </div>

      <button (click)="openForm()" class="mb-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        + Create Event
      </button>

      <div class="mb-6">
        <input [(ngModel)]="searchTerm" placeholder="Search by title or location..." class="w-full rounded border border-slate-300 px-3 py-2" (input)="applyFilters()">
      </div>

      <div class="rounded-lg bg-white shadow">
        <table class="w-full border-collapse">
          <thead class="bg-slate-100">
            <tr>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Title</th>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Date</th>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Location</th>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (event of filteredEvents; track event.id) {
              <tr class="border-b hover:bg-slate-50">
                <td class="px-6 py-3 font-medium">{{ event.title }}</td>
                <td class="px-6 py-3 text-sm">{{ event.date | date: 'short' }}</td>
                <td class="px-6 py-3 text-sm text-slate-600">{{ event.location }}</td>
                <td class="px-6 py-3">
                  <button (click)="openForm(event)" class="mr-2 text-blue-600 hover:text-blue-800">Edit</button>
                  <button (click)="deleteEvent(event.id)" class="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="4" class="px-6 py-8 text-center text-slate-500">No events found</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (showForm) {
        <div class="fixed inset-0 flex items-center justify-center bg-black/50">
          <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 class="mb-4 text-xl font-bold text-slate-900">{{ editingId ? 'Edit' : 'Create' }} Event</h2>
            <form [formGroup]="form" (ngSubmit)="submitForm()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700">Title *</label>
                <input formControlName="title" type="text" class="mt-1 w-full rounded border border-slate-300 px-3 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700">Description *</label>
                <textarea formControlName="description" class="mt-1 w-full rounded border border-slate-300 px-3 py-2"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700">Date *</label>
                <input formControlName="date" type="datetime-local" class="mt-1 w-full rounded border border-slate-300 px-3 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700">Location *</label>
                <input formControlName="location" type="text" class="mt-1 w-full rounded border border-slate-300 px-3 py-2">
              </div>
              <div class="flex gap-2 pt-4">
                <button type="submit" class="flex-1 rounded bg-blue-600 py-2 text-white hover:bg-blue-700">Save</button>
                <button type="button" (click)="closeForm()" class="flex-1 rounded bg-slate-300 py-2 text-slate-900 hover:bg-slate-400">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      }

      @if (errorMessage) {
        <div class="fixed bottom-4 right-4 rounded-lg bg-red-100 p-4 text-red-700">{{ errorMessage }}</div>
      }
      @if (successMessage) {
        <div class="fixed bottom-4 right-4 rounded-lg bg-green-100 p-4 text-green-700">{{ successMessage }}</div>
      }
    </div>
  `,
})
export class EventsManagementComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  form: FormGroup;
  showForm = false;
  editingId: number | null = null;
  searchTerm = '';
  errorMessage = '';
  successMessage = '';

  constructor(private eventService: EventService, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      date: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.applyFilters();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load events';
        console.error(err);
      }
    });
  }

  applyFilters(): void {
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openForm(event?: Event): void {
    this.showForm = true;
    if (event) {
      this.editingId = event.id;
      this.form.patchValue({
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location
      });
    } else {
      this.editingId = null;
      this.form.reset();
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.form.reset();
  }

  submitForm(): void {
    if (!this.form.valid) return;

    const request = this.form.value;
    const operation = this.editingId
      ? this.eventService.updateEvent(this.editingId, request)
      : this.eventService.createEvent(request);

    operation.subscribe({
      next: () => {
        this.successMessage = this.editingId ? 'Event updated successfully' : 'Event created successfully';
        setTimeout(() => this.successMessage = '', 3000);
        this.closeForm();
        this.loadEvents();
      },
      error: (err) => {
        this.errorMessage = 'Failed to save event';
        console.error(err);
      }
    });
  }

  deleteEvent(id: number): void {
    if (confirm('Are you sure?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.successMessage = 'Event deleted successfully';
          setTimeout(() => this.successMessage = '', 3000);
          this.loadEvents();
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete event';
          console.error(err);
        }
      });
    }
  }
}
