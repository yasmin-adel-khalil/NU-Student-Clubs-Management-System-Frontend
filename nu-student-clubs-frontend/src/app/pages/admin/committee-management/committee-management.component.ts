import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommitteeService } from '../../../core/services/committee.service';
import { CommitteeResponse, CommitteeWithMembers } from '../../../shared/models/committee.model';

@Component({
  selector: 'app-committee-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './committee-management.component.html',
  styleUrl: './committee-management.component.css'
})
export class CommitteeManagementComponent implements OnInit {
  committees: CommitteeResponse[] = [];
  filteredCommittees: CommitteeResponse[] = [];
  selectedCommittee: CommitteeWithMembers | null = null;
  
  showForm = false;
  showMembersModal = false;
  editingId: string | null = null;
  loading = false;
  error: string | null = null;
  
  searchTerm = '';
  filterClub = '';
  filterStatus = 'all';
  
  form!: FormGroup;

  constructor(
    private committeeService: CommitteeService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadCommittees();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      clubId: ['', Validators.required],
      description: ['', Validators.required],
      headId: ['', Validators.required],
      memberIds: [[]],
      isActive: [true]
    });
  }

  loadCommittees(): void {
    this.loading = true;
    this.committeeService.getAllCommittees().subscribe({
      next: (data) => {
        this.committees = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load committees';
        console.error(err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredCommittees = this.committees.filter(committee => {
      const matchesSearch = !this.searchTerm || 
        committee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        committee.clubName?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesClub = !this.filterClub || committee.clubId === this.filterClub;
      
      const matchesStatus = this.filterStatus === 'all' || 
        (this.filterStatus === 'active' && committee.isActive) ||
        (this.filterStatus === 'inactive' && !committee.isActive);
      
      return matchesSearch && matchesClub && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  openForm(committee?: CommitteeResponse): void {
    this.showForm = true;
    if (committee) {
      this.editingId = committee.id;
      this.form.patchValue({
        name: committee.name,
        clubId: committee.clubId,
        description: committee.description,
        headId: committee.headId,
        memberIds: committee.memberIds,
        isActive: committee.isActive
      });
    } else {
      this.editingId = null;
      this.form.reset({ isActive: true, memberIds: [] });
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.form.reset({ isActive: true, memberIds: [] });
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.editingId) {
      this.committeeService.updateCommittee(this.editingId, this.form.value).subscribe({
        next: () => {
          this.loadCommittees();
          this.closeForm();
        },
        error: (err) => {
          this.error = 'Failed to update committee';
          console.error(err);
        }
      });
    } else {
      this.committeeService.createCommittee(this.form.value).subscribe({
        next: () => {
          this.loadCommittees();
          this.closeForm();
        },
        error: (err) => {
          this.error = 'Failed to create committee';
          console.error(err);
        }
      });
    }
  }

  viewMembers(id: string): void {
    this.committeeService.getCommitteeById(id).subscribe({
      next: (data) => {
        this.selectedCommittee = data;
        this.showMembersModal = true;
      },
      error: (err) => {
        this.error = 'Failed to load committee members';
        console.error(err);
      }
    });
  }

  closeMembers(): void {
    this.showMembersModal = false;
    this.selectedCommittee = null;
  }

  deleteCommittee(id: string): void {
    if (confirm('Are you sure you want to delete this committee?')) {
      this.committeeService.deleteCommittee(id).subscribe({
        next: () => {
          this.loadCommittees();
        },
        error: (err) => {
          this.error = 'Failed to delete committee';
          console.error(err);
        }
      });
    }
  }
}
