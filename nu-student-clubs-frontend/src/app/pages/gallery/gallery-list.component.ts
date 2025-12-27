import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GalleryItem } from '../../shared/models/gallery.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-gallery-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <section class="max-w-6xl mx-auto p-4 space-y-6">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-semibold">Gallery</h1>
        <p class="text-sm text-gray-600">See all uploads and add new images.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <article *ngFor="let item of items" class="bg-white border rounded-lg overflow-hidden shadow-sm">
          <img [src]="item.imageUrl" [alt]="item.title" class="w-full h-48 object-cover" />
          <div class="p-4 space-y-1">
            <h2 class="text-base font-semibold text-gray-900">{{ item.title }}</h2>
            <p class="text-sm text-gray-700">{{ item.description }}</p>
          </div>
        </article>
        <div *ngIf="!items.length && !loading" class="col-span-full text-sm text-gray-600">No images uploaded yet.</div>
        <div *ngIf="loading" class="col-span-full text-sm text-gray-600">Loading gallery…</div>
      </div>

      <div class="rounded-lg border bg-white shadow-sm p-5 relative">
        <h2 class="text-xl font-semibold mb-3">Upload Image</h2>
        <form [formGroup]="form" (ngSubmit)="createItem()" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="block space-y-1">
              <span class="text-sm font-medium">Title</span>
              <input type="text" formControlName="title" class="w-full rounded border p-2" placeholder="Image title" />
              <span *ngIf="isInvalid('title')" class="text-xs text-red-600">Title is required.</span>
            </label>

            <label class="block space-y-1">
              <span class="text-sm font-medium">Club ID</span>
              <input type="text" formControlName="clubId" class="w-full rounded border p-2" placeholder="Club identifier" />
              <span *ngIf="isInvalid('clubId')" class="text-xs text-red-600">Club ID is required.</span>
            </label>
          </div>

          <label class="block space-y-1">
            <span class="text-sm font-medium">Image URL</span>
            <input type="url" formControlName="imageUrl" class="w-full rounded border p-2" placeholder="https://example.com/image.jpg" />
            <span *ngIf="isInvalid('imageUrl')" class="text-xs text-red-600">Image URL is required.</span>
          </label>

          <label class="block space-y-1">
            <span class="text-sm font-medium">Description</span>
            <textarea formControlName="description" rows="3" class="w-full rounded border p-2" placeholder="Describe the image"></textarea>
            <span *ngIf="isInvalid('description')" class="text-xs text-red-600">Description is required.</span>
          </label>

          <div class="flex items-center gap-3">
            <button type="submit" [disabled]="form.invalid || submitting" class="px-4 py-2 rounded bg-indigo-600 text-white disabled:bg-gray-400">
              {{ submitting ? 'Uploading…' : 'Upload Image' }}
            </button>
          </div>
        </form>

        <div *ngIf="toastMessage" class="fixed bottom-4 right-4 px-4 py-3 rounded shadow-md text-white"
             [ngClass]="toastType === 'success' ? 'bg-green-600' : 'bg-red-600'">
          {{ toastMessage }}
        </div>
      </div>
    </section>
  `
})
export class GalleryListComponent implements OnInit {
  items: GalleryItem[] = [];
  loading = false;
  submitting = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  form!: FormGroup;
  private toastTimer: any;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      clubId: ['', Validators.required]
    });
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.http.get<GalleryItem[]>(`${environment.apiUrl}/gallery`).subscribe({
      next: data => {
        this.items = data || [];
        this.loading = false;
      },
      error: () => {
        this.items = [];
        this.loading = false;
        this.showToast('Could not load gallery', 'error');
      }
    });
  }

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  createItem(): void {
    if (this.form.invalid || this.submitting) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.http.post(`${environment.apiUrl}/gallery`, this.form.value).subscribe({
      next: () => {
        this.submitting = false;
        this.showToast('Image uploaded successfully', 'success');
        this.form.reset();
        this.loadItems();
      },
      error: () => {
        this.submitting = false;
        this.showToast('Upload failed', 'error');
      }
    });
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }
}
