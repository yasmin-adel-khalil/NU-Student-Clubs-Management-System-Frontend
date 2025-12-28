import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubGalleryComponent } from './club-gallery.component';

@Component({
  selector: 'app-club-details',
  standalone: true,
  imports: [CommonModule, ClubGalleryComponent],
  template: `
    <section class="space-y-6">
      <h1 class="text-2xl font-semibold">Club Details</h1>
      <p class="text-sm text-gray-600">Club ID: <span class="font-mono">{{ clubId || 'Not found' }}</span></p>

      <div *ngIf="!clubId" class="p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
        No club ID provided in the URL
      </div>

      <app-club-gallery *ngIf="clubId" [clubId]="clubId"></app-club-gallery>
    </section>
  `
})
export class ClubDetailsComponent implements OnInit {
  clubId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.clubId = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
