import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationService, Application } from '../../../core/services/application.service';

@Component({
  selector: 'app-applications-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="min-h-screen bg-slate-50 p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900">Applications Review</h1>
        <p class="mt-2 text-slate-600">Review and approve club membership applications</p>
      </div>

      <div class="mb-6 flex gap-4">
        <select [(ngModel)]="statusFilter" class="rounded border border-slate-300 px-3 py-2" (change)="loadApplications()">
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <input [(ngModel)]="searchTerm" placeholder="Search by user or club..." class="flex-1 rounded border border-slate-300 px-3 py-2" (input)="applyFilters()">
      </div>

      <div class="rounded-lg bg-white shadow">
        <table class="w-full border-collapse">
          <thead class="bg-slate-100">
            <tr>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">User</th>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Club</th>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Status</th>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Submitted</th>
              <th class="border-b px-6 py-3 text-left font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (app of filteredApplications; track app.id) {
              <tr class="border-b hover:bg-slate-50">
                <td class="px-6 py-3">{{ app.userName || 'User #' + app.userId }}</td>
                <td class="px-6 py-3">{{ app.clubName || 'Club #' + app.clubId }}</td>
                <td class="px-6 py-3">
                  <span [ngClass]="{
                    'rounded bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700': app.status === 'PENDING',
                    'rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700': app.status === 'APPROVED',
                    'rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700': app.status === 'REJECTED'
                  }">
                    {{ app.status }}
                  </span>
                </td>
                <td class="px-6 py-3 text-sm text-slate-600">{{ app.submittedAt | date: 'short' }}</td>
                <td class="px-6 py-3 space-x-2">
                  @if (app.status === 'PENDING') {
                    <button (click)="approveApplication(app.id)" class="text-green-600 hover:text-green-800 font-medium">Approve</button>
                    <button (click)="rejectApplication(app.id)" class="text-red-600 hover:text-red-800 font-medium">Reject</button>
                  }
                  @if (app.status !== 'PENDING') {
                    <span class="text-sm text-slate-500">Resolved</span>
                  }
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="px-6 py-8 text-center text-slate-500">No applications found</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (errorMessage) {
        <div class="fixed bottom-4 right-4 rounded-lg bg-red-100 p-4 text-red-700">{{ errorMessage }}</div>
      }
      @if (successMessage) {
        <div class="fixed bottom-4 right-4 rounded-lg bg-green-100 p-4 text-green-700">{{ successMessage }}</div>
      }
    </div>
  `,
})
export class ApplicationsReviewComponent implements OnInit {
  applications: Application[] = [];
  filteredApplications: Application[] = [];
  statusFilter = 'PENDING';
  searchTerm = '';
  errorMessage = '';
  successMessage = '';

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    const status = this.statusFilter || undefined;
    this.applicationService.getAllApplications(status).subscribe({
      next: (data) => {
        this.applications = data;
        this.applyFilters();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load applications';
        console.error(err);
      }
    });
  }

  applyFilters(): void {
    this.filteredApplications = this.applications.filter(app => {
      const matchesSearch = !this.searchTerm ||
        (app.userName?.toLowerCase() || '').includes(this.searchTerm.toLowerCase()) ||
        (app.clubName?.toLowerCase() || '').includes(this.searchTerm.toLowerCase());
      return matchesSearch;
    });
  }

  approveApplication(id: number): void {
    this.applicationService.approveApplication(id).subscribe({
      next: () => {
        this.successMessage = 'Application approved successfully';
        setTimeout(() => this.successMessage = '', 3000);
        this.loadApplications();
      },
      error: (err) => {
        this.errorMessage = 'Failed to approve application';
        console.error(err);
      }
    });
  }

  rejectApplication(id: number): void {
    const reason = prompt('Enter rejection reason (optional):', '');
    if (reason !== null) {
      this.applicationService.rejectApplication(id, reason).subscribe({
        next: () => {
          this.successMessage = 'Application rejected successfully';
          setTimeout(() => this.successMessage = '', 3000);
          this.loadApplications();
        },
        error: (err) => {
          this.errorMessage = 'Failed to reject application';
          console.error(err);
        }
      });
    }
  }
}
