import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GalleryService } from '../../core/services/gallery.service';
import { GalleryItem } from '../../shared/models/gallery.model';

@Component({
  selector: 'app-club-gallery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="space-y-6">
      <h2 class="text-xl font-semibold">Club Gallery</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <article *ngFor="let item of items" class="bg-white border rounded-lg overflow-hidden shadow-sm">
          <img [src]="item.imageUrl" [alt]="item.title" class="w-full h-48 object-cover" />
          <div class="p-4 space-y-1">
            <h3 class="text-base font-semibold text-gray-900">{{ item.title }}</h3>
            <p class="text-sm text-gray-700">{{ item.description }}</p>
          </div>
        </article>
        <div *ngIf="!items.length && !loading" class="col-span-full text-sm text-gray-600">No images for this club yet.</div>
        <div *ngIf="loading" class="col-span-full text-sm text-gray-600">Loading gallery…</div>
      </div>

      <div class="rounded-lg border bg-white shadow-sm p-5">
        <h3 class="text-lg font-semibold mb-3">Upload Image</h3>
        <form [formGroup]="form" (ngSubmit)="createItem()" class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2">
            <label class="block space-y-1">
              <span class="text-sm font-medium">Title</span>
              <input type="text" formControlName="title" class="w-full rounded border p-2" placeholder="Image title" />
              <span *ngIf="isInvalid('title')" class="text-xs text-red-600">Title is required.</span>
            </label>

            <label class="block space-y-1">
              <span class="text-sm font-medium">Upload Image</span>
              <input type="file" accept="image/*" (change)="onFileSelected($event)" class="w-full rounded border p-2" />
              <span *ngIf="isInvalid('image')" class="text-xs text-red-600">Image is required.</span>
            </label>
          </div>

          <div *ngIf="imagePreview" class="flex justify-center">
            <img [src]="imagePreview" alt="Preview" class="max-h-48 rounded border" />
          </div>

          <label class="block space-y-1">
            <span class="text-sm font-medium">Description</span>
            <textarea formControlName="description" rows="3" class="w-full rounded border p-2" placeholder="Describe the image"></textarea>
            <span *ngIf="isInvalid('description')" class="text-xs text-red-600">Description is required.</span>
          </label>

          <div class="flex items-center gap-3">
            <button type="submit" [disabled]="form.invalid || submitting || !selectedFile" class="px-4 py-2 rounded bg-indigo-600 text-white disabled:bg-gray-400">
              {{ submitting ? 'Uploading…' : 'Upload Image' }}
            </button>
            <span *ngIf="successMessage" class="text-sm text-green-600">{{ successMessage }}</span>
            <span *ngIf="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</span>
          </div>
        </form>
      </div>
    </section>
  `
})
export class ClubGalleryComponent implements OnInit {
  @Input() clubId!: string;
  items: GalleryItem[] = [];
  loading = false;
  submitting = false;
  successMessage = '';
  errorMessage = '';
  form!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private gallery: GalleryService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });
    this.loadItems();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.form.patchValue({ image: this.selectedFile });
      this.form.get('image')?.updateValueAndValidity();

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  loadItems(): void {
    if (!this.clubId) {
      console.warn('ClubGalleryComponent: No clubId provided');
      return;
    }
    this.loading = true;
    console.log('Fetching gallery for club:', this.clubId);
    this.gallery.getClubGallery(this.clubId).subscribe({
      next: data => {
        console.log('Gallery items received:', data);
        this.items = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Gallery fetch error:', err);
        this.items = [];
        this.loading = false;
        this.errorMessage = 'Could not load gallery. Check backend connection.';
      }
    });
  }

  isInvalid(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  createItem(): void {
    if (this.form.invalid || this.submitting || !this.clubId || !this.selectedFile) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Convert image to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
      const payload = {
        title: this.form.value.title,
        description: this.form.value.description,
        imageUrl: base64Image,
        clubId: this.clubId
      };

      this.gallery.uploadClubImage(payload).subscribe({
        next: () => {
          this.submitting = false;
          this.successMessage = 'Image uploaded successfully';
          this.form.reset();
          this.selectedFile = null;
          this.imagePreview = null;
          this.loadItems();
        },
        error: () => {
          this.submitting = false;
          this.errorMessage = 'Upload failed';
        }
      });
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
