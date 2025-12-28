import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BoardMemberService } from '../../../core/services/board-member.service';
import { BoardMemberResponse, BoardPosition } from '../../../shared/models/board-member.model';

@Component({
  selector: 'app-board-member-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './board-member-management.component.html',
  styleUrl: './board-member-management.component.css'
})
export class BoardMemberManagementComponent implements OnInit {
  boardMembers: BoardMemberResponse[] = [];
  filteredMembers: BoardMemberResponse[] = [];
  
  showForm = false;
  editingId: number | null = null;
  loading = false;
  error: string | null = null;
  
  searchTerm = '';
  filterPosition = '';
  
  form!: FormGroup;
  boardPositions = Object.values(BoardPosition);

  constructor(
    private boardMemberService: BoardMemberService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadBoardMembers();
  }

  private initForm(): void {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      clubId: ['', Validators.required],
      position: ['', Validators.required],
      joinDate: ['', Validators.required],
      endDate: [''],
      isActive: [true]
    });
  }

  loadBoardMembers(): void {
    this.loading = true;
    this.boardMemberService.getAllBoardMembers().subscribe({
      next: (data) => {
        this.boardMembers = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load board members';
        console.error(err);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredMembers = this.boardMembers.filter(member => {
      const matchesSearch = !this.searchTerm || 
        member.userName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.clubName?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesPosition = !this.filterPosition || member.position === this.filterPosition;
      
      return matchesSearch && matchesPosition;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  openForm(member?: BoardMemberResponse): void {
    this.showForm = true;
    if (member) {
      this.editingId = member.id;
      this.form.patchValue({
        userId: member.userId,
        clubId: member.clubId,
        position: member.position,
        joinDate: member.joinDate,
        endDate: member.endDate,
        isActive: member.isActive
      });
    } else {
      this.editingId = null;
      this.form.reset({ isActive: true });
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.form.reset({ isActive: true });
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.editingId) {
      this.boardMemberService.updateBoardMember(this.editingId.toString(), this.form.value).subscribe({
        next: () => {
          this.loadBoardMembers();
          this.closeForm();
        },
        error: (err) => {
          this.error = 'Failed to update board member';
          console.error(err);
        }
      });
    } else {
      this.boardMemberService.createBoardMember(this.form.value).subscribe({
        next: () => {
          this.loadBoardMembers();
          this.closeForm();
        },
        error: (err) => {
          this.error = 'Failed to create board member';
          console.error(err);
        }
      });
    }
  }

  deleteMember(id: number): void {
    if (confirm('Are you sure you want to delete this board member?')) {
      this.boardMemberService.deleteBoardMember(id.toString()).subscribe({
        next: () => {
          this.loadBoardMembers();
        },
        error: (err) => {
          this.error = 'Failed to delete board member';
          console.error(err);
        }
      });
    }
  }
}
