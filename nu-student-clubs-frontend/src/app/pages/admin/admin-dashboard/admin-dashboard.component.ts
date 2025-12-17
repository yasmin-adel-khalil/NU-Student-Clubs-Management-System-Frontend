import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../../core/services/admin.service';
import { BoardMemberService } from '../../../core/services/board-member.service';
import { CommitteeService } from '../../../core/services/committee.service';
import { AdminResponse } from '../../../shared/models/admin.model';
import { BoardMemberResponse } from '../../../shared/models/board-member.model';
import { CommitteeResponse } from '../../../shared/models/committee.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  activeTab: 'overview' | 'admins' | 'board-members' | 'committees' = 'overview';
  
  admins: AdminResponse[] = [];
  boardMembers: BoardMemberResponse[] = [];
  committees: CommitteeResponse[] = [];
  
  loading = false;
  error: string | null = null;

  stats = {
    totalAdmins: 0,
    totalBoardMembers: 0,
    totalCommittees: 0,
    activeBoardMembers: 0
  };

  constructor(
    private adminService: AdminService,
    private boardMemberService: BoardMemberService,
    private committeeService: CommitteeService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = null;

    this.adminService.getAllAdmins().subscribe({
      next: (data: AdminResponse[]) => {
        this.admins = data;
        this.stats.totalAdmins = data.length;
      },
      error: (err: any) => {
        this.error = 'Failed to load admins';
        console.error(err);
      }
    });

    this.boardMemberService.getAllBoardMembers().subscribe({
      next: (data: BoardMemberResponse[]) => {
        this.boardMembers = data;
        this.stats.totalBoardMembers = data.length;
        this.stats.activeBoardMembers = data.filter(m => m.isActive).length;
      },
      error: (err: any) => {
        this.error = 'Failed to load board members';
        console.error(err);
      }
    });

    this.committeeService.getAllCommittees().subscribe({
      next: (data: CommitteeResponse[]) => {
        this.committees = data;
        this.stats.totalCommittees = data.length;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load committees';
        console.error(err);
        this.loading = false;
      }
    });
  }

  setActiveTab(tab: 'overview' | 'admins' | 'board-members' | 'committees'): void {
    this.activeTab = tab;
  }
}
