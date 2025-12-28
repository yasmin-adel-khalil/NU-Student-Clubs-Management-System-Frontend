import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from '../../shared/models/club.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-club-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <section class="max-w-5xl mx-auto p-4 space-y-6">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-semibold">Clubs</h1>
        <p class="text-sm text-gray-600">Browse all clubs and create new ones.</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article *ngFor="let club of clubs" 
                 (click)="viewClub(club.id.toString())" 
                 class="rounded-lg border bg-white shadow-sm p-4 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1">
              <h2 class="text-lg font-semibold text-gray-900">{{ club.name }}</h2>
              <p class="text-sm text-gray-600">{{ club.category }}</p>
            </div>
            <span class="text-xs text-indigo-700 font-medium bg-indigo-50 px-2 py-1 rounded">
              {{ club.memberCount }} members
            </span>
          </div>
          <p class="text-sm text-gray-700 line-clamp-2" *ngIf="club.description">{{ club.description }}</p>
        </article>
        <div *ngIf="!clubs.length && !loading" class="col-span-full text-sm text-gray-600">No clubs available.</div>
        <div *ngIf="loading" class="col-span-full text-sm text-gray-600">Loading clubs…</div>
      </div>

      <div class="rounded-lg border bg-white shadow-sm p-5">
        <h2 class="text-xl font-semibold mb-3">Create Club</h2>
        <form [formGroup]="form" (ngSubmit)="createClub()" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="block space-y-1">
              <span class="text-sm font-medium">Club Name</span>
              <input type="text" formControlName="name" class="w-full rounded border p-2" placeholder="Club name" />
              <span *ngIf="isInvalid('name')" class="text-xs text-red-600">Name is required.</span>
            </label>

            <label class="block space-y-1">
              <span class="text-sm font-medium">Category</span>
              <input type="text" formControlName="category" class="w-full rounded border p-2" placeholder="e.g., Sports, Arts, Tech" />
              <span *ngIf="isInvalid('category')" class="text-xs text-red-600">Category is required.</span>
            </label>
          </div>

          <label class="block space-y-1">
            <span class="text-sm font-medium">Description</span>
            <textarea formControlName="description" rows="3" class="w-full rounded border p-2" placeholder="Club description"></textarea>
            <span *ngIf="isInvalid('description')" class="text-xs text-red-600">Description is required.</span>
          </label>

          <label class="block space-y-1">
            <span class="text-sm font-medium">Image URL</span>
            <input type="url" formControlName="imageUrl" class="w-full rounded border p-2" placeholder="https://example.com/image.jpg" />
          </label>

          <div class="flex items-center gap-3">
            <button type="submit" [disabled]="form.invalid || submitting" class="px-4 py-2 rounded bg-indigo-600 text-white disabled:bg-gray-400">
              {{ submitting ? 'Creating…' : 'Create Club' }}
            </button>
            <span *ngIf="successMessage" class="text-sm text-green-600">{{ successMessage }}</span>
            <span *ngIf="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</span>
          </div>
        </form>
      </div>
    </section>
  `
})
export class ClubListComponent implements OnInit {
  clubs: Club[] = [];
  loading = false;
  submitting = false;
  successMessage = '';
  errorMessage = '';
  form!: FormGroup;

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['']
    });
    this.loadClubs();
  }

  loadClubs(): void {
    this.loading = true;
    this.http.get<Club[]>(`${environment.apiBaseUrl}/clubs`).subscribe({
      next: data => {
        this.clubs = data || [];
        this.loading = false;
      },
      error: () => {
        this.clubs = [];
        this.loading = false;
        this.errorMessage = 'Could not load clubs';
      }
    });
  }

  viewClub(clubId: string): void {
    this.router.navigate(['/clubs', clubId]);
  }

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  createClub(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.http.post(`${environment.apiBaseUrl}/clubs`, this.form.value).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Club created successfully';
        this.form.reset();
        this.loadClubs();
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = 'Failed to create club';
      }
    });
  }
}
