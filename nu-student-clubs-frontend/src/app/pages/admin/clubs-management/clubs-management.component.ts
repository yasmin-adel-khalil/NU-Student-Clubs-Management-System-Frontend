import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClubService } from '../../../core/services/club.service';
import { Club } from '../../../shared/models/club.model';

@Component({
  selector: 'app-clubs-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="min-h-screen bg-slate-50 p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900">Clubs Management</h1>
        <p class="mt-2 text-slate-600">Create and manage student clubs</p>
      </div>

      <button (click)="openForm()" class="mb-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        + Create Club
      </button>

      <div class="mb-6 flex gap-4">
        <input [(ngModel)]="searchTerm" placeholder="Search by name..." class="flex-1 rounded border border-slate-300 px-3 py-2" (input)="applyFilters()">
        <input [(ngModel)]="categoryFilter" placeholder="Filter by category..." class="flex-1 rounded border border-slate-300 px-3 py-2" (input)="applyFilters()">
      </div>

      <div class="rounded-lg bg-white shadow">
        <table class="w-full border-collapse">
          <thead class="bg-slate-100">
            <tr>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Name</th>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Description</th>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Category</th>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (club of filteredClubs; track club.id) {
              <tr class="border-b hover:bg-slate-50">
                <td class="px-6 py-3">{{ club.name }}</td>
                <td class="px-6 py-3 text-sm text-slate-600">{{ club.description }}</td>
                <td class="px-6 py-3"><span class="rounded bg-slate-100 px-2 py-1 text-xs">{{ club.category }}</span></td>
                <td class="px-6 py-3">
                  <button (click)="openForm(club)" class="mr-2 text-blue-600 hover:text-blue-800">Edit</button>
                  <button (click)="deleteClub(club.id)" class="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="4" class="px-6 py-8 text-center text-slate-500">No clubs found</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (showForm) {
        <div class="fixed inset-0 flex items-center justify-center bg-black/50">
          <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 class="mb-4 text-xl font-bold text-slate-900">{{ editingId ? 'Edit' : 'Create' }} Club</h2>
            <form [formGroup]="form" (ngSubmit)="submitForm()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700">Name *</label>
                <input formControlName="name" type="text" class="mt-1 w-full rounded border border-slate-300 px-3 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700">Description *</label>
                <textarea formControlName="description" class="mt-1 w-full rounded border border-slate-300 px-3 py-2"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700">Category</label>
                <input formControlName="category" type="text" class="mt-1 w-full rounded border border-slate-300 px-3 py-2">
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
export class ClubsManagementComponent implements OnInit {
  clubs: Club[] = [];
  filteredClubs: Club[] = [];
  form: FormGroup;
  showForm = false;
  editingId: string | null = null;
  searchTerm = '';
  categoryFilter = '';
  errorMessage = '';
  successMessage = '';

  constructor(private clubService: ClubService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.loadClubs();
  }

  loadClubs(): void {
    this.clubService.getAllClubs().subscribe({
      next: (data) => {
        this.clubs = data;
        this.applyFilters();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load clubs';
        console.error(err);
      }
    });
  }

  applyFilters(): void {
    this.filteredClubs = this.clubs.filter(club => {
      const matchesSearch = club.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.categoryFilter || club.category?.toLowerCase().includes(this.categoryFilter.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }

  openForm(club?: Club): void {
    this.showForm = true;
    if (club) {
      this.editingId = club.id as any;
      this.form.patchValue({
        name: club.name,
        description: club.description,
        category: club.category
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
      ? this.clubService.updateClub(Number(this.editingId), request)
      : this.clubService.createClub(request);

    operation.subscribe({
      next: () => {
        this.successMessage = this.editingId ? 'Club updated successfully' : 'Club created successfully';
        setTimeout(() => this.successMessage = '', 3000);
        this.closeForm();
        this.loadClubs();
      },
      error: (err) => {
        this.errorMessage = 'Failed to save club';
        console.error(err);
      }
    });
  }

  deleteClub(id: any): void {
    if (confirm('Are you sure?')) {
      this.clubService.deleteClub(id).subscribe({
        next: () => {
          this.successMessage = 'Club deleted successfully';
          setTimeout(() => this.successMessage = '', 3000);
          this.loadClubs();
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete club';
          console.error(err);
        }
      });
    }
  }
}
