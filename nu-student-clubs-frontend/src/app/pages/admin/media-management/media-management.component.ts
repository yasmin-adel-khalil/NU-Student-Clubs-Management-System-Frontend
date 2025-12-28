import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GalleryService, MediaItem } from '../../../core/services/gallery.service';

@Component({
  selector: 'app-media-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="min-h-screen bg-slate-50 p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900">Media Management</h1>
        <p class="mt-2 text-slate-600">Manage gallery images and videos</p>
      </div>

      <button (click)="openForm()" class="mb-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        + Upload Media
      </button>

      <div class="mb-6 flex gap-4">
        <input [(ngModel)]="searchTerm" placeholder="Search by title..." class="flex-1 rounded border border-slate-300 px-3 py-2" (input)="applyFilters()">
        <select [(ngModel)]="typeFilter" class="rounded border border-slate-300 px-3 py-2" (change)="applyFilters()">
          <option value="">All Types</option>
          <option value="IMAGE">Images</option>
          <option value="VIDEO">Videos</option>
        </select>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        @for (media of filteredMedia; track media.id) {
          <div class="rounded-lg bg-white p-4 shadow">
            @if (media.type === 'IMAGE') {
              <img [src]="media.url" alt="{{ media.title }}" class="mb-3 h-48 w-full object-cover rounded">
            } @else {
              <div class="mb-3 h-48 w-full rounded bg-slate-200 flex items-center justify-center">
                <span class="text-slate-500">Video: {{ media.title }}</span>
              </div>
            }
            <h3 class="font-semibold text-slate-900">{{ media.title }}</h3>
            <p class="text-xs text-slate-500 mb-3"><span class="rounded bg-blue-100 px-2 py-1 text-blue-700">{{ media.type }}</span></p>
            <div class="flex gap-2">
              <button (click)="openForm(media)" class="flex-1 text-sm text-blue-600 hover:text-blue-800">Edit</button>
              <button (click)="media.id !== undefined && deleteMedia(media.id)" class="flex-1 text-sm text-red-600 hover:text-red-800">Delete</button>
            </div>
          </div>
        } @empty {
          <div class="col-span-full rounded-lg bg-white p-8 text-center text-slate-500">No media found</div>
        }
      </div>

      @if (showForm) {
        <div class="fixed inset-0 flex items-center justify-center bg-black/50">
          <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 class="mb-4 text-xl font-bold text-slate-900">{{ editingId ? 'Edit' : 'Upload' }} Media</h2>
            <form [formGroup]="form" (ngSubmit)="submitForm()" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700">URL *</label>
                <input formControlName="url" type="url" class="mt-1 w-full rounded border border-slate-300 px-3 py-2">
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700">Type *</label>
                <select formControlName="type" class="mt-1 w-full rounded border border-slate-300 px-3 py-2">
                  <option value="">Select Type</option>
                  <option value="IMAGE">Image</option>
                  <option value="VIDEO">Video</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700">Title</label>
                <input formControlName="title" type="text" class="mt-1 w-full rounded border border-slate-300 px-3 py-2">
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
export class MediaManagementComponent implements OnInit {
  media: MediaItem[] = [];
  filteredMedia: MediaItem[] = [];
  form: FormGroup;
  showForm = false;
  editingId: number | null = null;
  searchTerm = '';
  typeFilter = '';
  errorMessage = '';
  successMessage = '';

  constructor(private galleryService: GalleryService, private fb: FormBuilder) {
    this.form = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      type: ['', Validators.required],
      title: ['']
    });
  }

  ngOnInit(): void {
    this.loadMedia();
  }

  loadMedia(): void {
    this.galleryService.getAllMedia().subscribe({
      next: (data) => {
        this.media = data;
        this.applyFilters();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load media';
        console.error(err);
      }
    });
  }

  applyFilters(): void {
    this.filteredMedia = this.media.filter(item => {
      const matchesSearch = !this.searchTerm || (item.title?.toLowerCase() || '').includes(this.searchTerm.toLowerCase());
      const matchesType = !this.typeFilter || item.type === this.typeFilter;
      return matchesSearch && matchesType;
    });
  }

  openForm(media?: MediaItem): void {
    this.showForm = true;
    if (media) {
      this.editingId = media.id !== undefined ? media.id : null;
      this.form.patchValue({
        url: media.url,
        type: media.type,
        title: media.title
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
      ? this.galleryService.updateMedia(this.editingId, request)
      : this.galleryService.uploadMedia(request);

    operation.subscribe({
      next: () => {
        this.successMessage = this.editingId ? 'Media updated successfully' : 'Media uploaded successfully';
        setTimeout(() => this.successMessage = '', 3000);
        this.closeForm();
        this.loadMedia();
      },
      error: (err) => {
        this.errorMessage = 'Failed to save media';
        console.error(err);
      }
    });
  }

  deleteMedia(id: number): void {
    if (confirm('Are you sure?')) {
      this.galleryService.deleteMedia(id).subscribe({
        next: () => {
          this.successMessage = 'Media deleted successfully';
          setTimeout(() => this.successMessage = '', 3000);
          this.loadMedia();
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete media';
          console.error(err);
        }
      });
    }
  }
}
