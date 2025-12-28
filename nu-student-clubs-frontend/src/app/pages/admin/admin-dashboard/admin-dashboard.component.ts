import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AdminService } from '../../../core/services/admin.service';
import { BoardMemberService } from '../../../core/services/board-member.service';
import { CommitteeService } from '../../../core/services/committee.service';
import { ClubService } from '../../../core/services/club.service';
import { AdminResponse } from '../../../shared/models/admin.model';
import { BoardMemberResponse } from '../../../shared/models/board-member.model';
import { CommitteeResponse } from '../../../shared/models/committee.model';
import { Club } from '../../../shared/models/club.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  activeTab: 'overview' | 'admins' | 'board-members' | 'committees' = 'overview';
  
  admins: AdminResponse[] = [];
  boardMembers: BoardMemberResponse[] = [];
  committees: CommitteeResponse[] = [];
  clubs: Club[] = [];
  
  loading = false;
  error: string | null = null;
  success: string | null = null;

  // simple form state for add actions
  showAddAdmin = false;
  showAddBoardMember = false;
  showAddCommittee = false;

  editingAdminId: number | null = null;
  editingBoardMemberId: number | null = null;
  editingCommitteeId: number | null = null;

  adminForm = {
    name: '',
    position: '',
    club: '',
    season: new Date().getFullYear()
  };

  // Edit form for admin
  adminEditForm = {
    name: '',
    position: '',
    club: '',
    season: new Date().getFullYear()
  };

  boardMemberForm = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    clubId: '',
    position: '',
    joinDate: '',
    committee: '',
    season: new Date().getFullYear().toString()
  };

  committeeForm = {
    name: '',
    clubName: '',
    description: '',
    headName: ''
  };

  stats = {
    totalAdmins: 0,
    totalBoardMembers: 0,
    totalCommittees: 0,
    activeBoardMembers: 0
  };

  currentYear = new Date().getFullYear();

  constructor(
    private adminService: AdminService,
    private boardMemberService: BoardMemberService,
    private committeeService: CommitteeService,
    private clubService: ClubService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.error = null;

    this.adminService.getAllAdmins().pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading = false)
    ).subscribe({
      next: (data: AdminResponse[]) => {
        this.admins = data;
        this.stats.totalAdmins = data.length;
      },
      error: (err: any) => {
        this.error = 'Failed to load admins';
        console.error(err);
      }
    });

    this.boardMemberService.getAllBoardMembers().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
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

    this.committeeService.getAllCommittees().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (data: CommitteeResponse[]) => {
        this.committees = data;
        this.stats.totalCommittees = data.length;
      },
      error: (err: any) => {
        this.error = 'Failed to load committees';
        console.error(err);
      }
    });

    this.clubService.getAllClubs().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (clubs: Club[]) => {
        this.clubs = clubs;
      },
      error: (err: any) => {
        console.error('Failed to load clubs', err);
      }
    });
  }

  setActiveTab(tab: 'overview' | 'admins' | 'board-members' | 'committees'): void {
    this.activeTab = tab;
  }

  openAddAdmin(): void {
    this.success = null;
    this.showAddAdmin = true;
    this.activeTab = 'admins';
  }

  openAddBoardMember(): void {
    this.success = null;
    this.showAddBoardMember = true;
    this.activeTab = 'board-members';
  }

  openAddCommittee(): void {
    this.success = null;
    this.showAddCommittee = true;
    this.activeTab = 'committees';
  }

  submitAdmin(): void {
    this.error = null;
    this.success = null;
    this.loading = true;

    if (this.editingAdminId) {
      const request = {
        name: this.adminEditForm.name,
        position: this.adminEditForm.position,
        club: this.adminEditForm.club,
        season: Number(this.adminEditForm.season)
      };

      this.adminService.updateAdmin(this.editingAdminId.toString(), request as any).pipe(
        finalize(() => this.loading = false)
      ).subscribe({
        next: (updated) => {
          const index = this.admins.findIndex(a => a.id === this.editingAdminId!);
          if (index >= 0) {
            this.admins[index] = updated as any;
            this.admins = [...this.admins];
          }
          this.showAddAdmin = false;
          this.editingAdminId = null;
          this.adminEditForm = { name: '', position: '', club: '', season: new Date().getFullYear() };
          this.success = 'Admin updated successfully';
        },
        error: () => {
          this.error = 'Failed to update admin';
        }
      });
    } else {
      const request = {
        name: this.adminForm.name,
        position: this.adminForm.position,
        club: this.adminForm.club,
        season: Number(this.adminForm.season)
      };
      this.adminService.createAdmin(request).pipe(
        finalize(() => this.loading = false)
      ).subscribe({
        next: created => {
          this.showAddAdmin = false;
          this.adminForm = { name: '', position: '', club: '', season: new Date().getFullYear() };
          this.admins = [...this.admins, created as any];
          this.stats.totalAdmins = this.admins.length;
          this.success = 'Admin added successfully';
        },
        error: err => {
          this.error = 'Failed to create admin';
          console.error(err);
        }
      });
    }
  }

  editAdmin(admin: any): void {
    this.editingAdminId = admin.id;
    this.adminEditForm = {
      name: admin.name,
      position: admin.position,
      club: admin.club,
      season: admin.season || new Date().getFullYear()
    };
    this.showAddAdmin = true;
    this.activeTab = 'admins';
    this.success = null;
  }

  deleteAdmin(id: number): void {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.loading = true;
      this.adminService.deleteAdmin(id.toString()).pipe(
        finalize(() => this.loading = false)
      ).subscribe({
        next: () => {
          // حذف من الـ array فوراً
          this.admins = this.admins.filter((a) => a.id !== id);
          this.stats.totalAdmins = this.admins.length;
          this.success = 'Admin deleted successfully';
          // إخفاء رسالة النجاح بعد 3 ثواني
          setTimeout(() => this.success = null, 3000);
          // إعادة التحميل من السيرفر لضمان التزامن
          this.loadDashboardData();
        },
        error: (err) => {
          this.error = 'Failed to delete admin';
          console.error('Delete error:', err);
          // إخفاء رسالة الخطأ بعد 3 ثواني
          setTimeout(() => this.error = null, 3000);
        }
      });
    }
  }

  submitBoardMember(): void {
    this.error = null;
    this.success = null;
    const request = {
      email: this.boardMemberForm.email,
      password: this.boardMemberForm.password,
      firstName: this.boardMemberForm.firstName,
      lastName: this.boardMemberForm.lastName,
      position: this.boardMemberForm.position,
      joinDate: this.boardMemberForm.joinDate,
      club: { id: Number(this.boardMemberForm.clubId) }
    };

    if (this.editingBoardMemberId) {
      this.boardMemberService.updateBoardMember(this.editingBoardMemberId.toString(), request as any).subscribe({
        next: (updated) => {
          const index = this.boardMembers.findIndex((m) => m.id === this.editingBoardMemberId!);
          if (index >= 0) {
            this.boardMembers = [...this.boardMembers.slice(0, index), updated, ...this.boardMembers.slice(index + 1)];
          }
          this.showAddBoardMember = false;
          this.editingBoardMemberId = null;
          this.boardMemberForm = { email: '', password: '', firstName: '', lastName: '', clubId: '', position: '', joinDate: '', committee: '', season: new Date().getFullYear().toString() };
          this.success = 'Board member updated successfully';
        },
        error: () => {
          this.error = 'Failed to update board member';
        }
      });
    } else {
      this.boardMemberService.createBoardMember(request).subscribe({
        next: (created) => {
          this.boardMembers = [...this.boardMembers, created as any];
          this.stats.totalBoardMembers = this.boardMembers.length;
          this.stats.activeBoardMembers = this.boardMembers.filter(m => m.isActive).length;
          this.showAddBoardMember = false;
          this.boardMemberForm = { email: '', password: '', firstName: '', lastName: '', clubId: '', position: '', joinDate: '', committee: '', season: new Date().getFullYear().toString() };
          this.success = 'Board member added successfully';
        },
        error: () => {
          this.error = 'Failed to create board member';
        }
      });
    }
  }

  editBoardMember(member: any): void {
    this.editingBoardMemberId = member.id;
    this.boardMemberForm = {
      email: member.email,
      password: '',
      firstName: member.firstName,
      lastName: member.lastName,
      clubId: member.clubId || '',
      position: member.position,
      joinDate: member.joinDate,
      committee: member.committee || '',
      season: member.season || new Date().getFullYear().toString()
    };
    this.showAddBoardMember = true;
    this.activeTab = 'board-members';
    this.success = null;
  }

  deleteBoardMember(id: number): void {
    if (confirm('Are you sure you want to delete this board member?')) {
      this.loading = true;
      this.boardMemberService.deleteBoardMember(id.toString()).pipe(
        finalize(() => this.loading = false)
      ).subscribe({
        next: () => {
          this.boardMembers = this.boardMembers.filter((m) => m.id !== id);
          this.stats.totalBoardMembers = this.boardMembers.length;
          this.stats.activeBoardMembers = this.boardMembers.filter(m => m.isActive).length;
          this.success = 'Board member deleted successfully';
          setTimeout(() => this.success = null, 3000);
        },
        error: (err) => {
          this.error = 'Failed to delete board member';
          console.error('Delete error:', err);
          setTimeout(() => this.error = null, 3000);
        }
      });
    }
  }

  submitCommittee(): void {
    this.error = null;
    this.success = null;
    const matchedClub = this.clubs.find(c => c.name?.trim().toLowerCase() === this.committeeForm.clubName.trim().toLowerCase());
    if (!matchedClub) {
      this.error = 'Club name not found. Please select an existing club.';
      return;
    }
    const request = {
      name: this.committeeForm.name,
      description: this.committeeForm.description,
      clubName: this.committeeForm.clubName,
      headName: this.committeeForm.headName,
      club: { id: Number(matchedClub.id) }
    };

    if (this.editingCommitteeId) {
      this.committeeService.updateCommittee(this.editingCommitteeId.toString(), request as any).subscribe({
        next: (updated) => {
          const index = this.committees.findIndex((c) => c.id === this.editingCommitteeId!);
          if (index >= 0) {
            this.committees = [...this.committees.slice(0, index), updated, ...this.committees.slice(index + 1)];
          }
          this.showAddCommittee = false;
          this.editingCommitteeId = null;
          this.committeeForm = { name: '', clubName: '', description: '', headName: '' };
          this.success = 'Committee updated successfully';
        },
        error: () => {
          this.error = 'Failed to update committee';
        }
      });
    } else {
      this.committeeService.createCommittee(request).subscribe({
        next: (created) => {
          this.committees = [...this.committees, created as any];
          this.stats.totalCommittees = this.committees.length;
          this.showAddCommittee = false;
          this.committeeForm = { name: '', clubName: '', description: '', headName: '' };
          this.success = 'Committee created successfully';
        },
        error: err => {
          this.error = 'Failed to create committee';
          console.error(err);
        }
      });
    }
  }

  editCommittee(committee: any): void {
    this.editingCommitteeId = committee.id;
    this.committeeForm = {
      name: committee.name,
      clubName: committee.clubName || '',
      description: committee.description,
      headName: committee.headName || ''
    };
    this.showAddCommittee = true;
    this.activeTab = 'committees';
    this.success = null;
  }

  deleteCommittee(id: number): void {
    if (confirm('Are you sure you want to delete this committee?')) {
      this.loading = true;
      this.committeeService.deleteCommittee(id.toString()).pipe(
        finalize(() => this.loading = false)
      ).subscribe({
        next: () => {
          this.committees = this.committees.filter((c) => c.id !== id);
          this.stats.totalCommittees = this.committees.length;
          this.success = 'Committee deleted successfully';
          setTimeout(() => this.success = null, 3000);
        },
        error: (err) => {
          this.error = 'Failed to delete committee';
          console.error('Delete error:', err);
          setTimeout(() => this.error = null, 3000);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
