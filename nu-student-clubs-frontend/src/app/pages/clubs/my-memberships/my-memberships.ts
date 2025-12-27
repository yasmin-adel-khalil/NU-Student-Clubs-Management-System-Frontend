import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MembershipService } from '../../../core/services/membership.service';
import { Membership } from '../../../shared/models/membership.model';

@Component({
  selector: 'app-my-memberships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-memberships.html',
  styleUrl: './my-memberships.css'
})
export class MyMembershipsComponent implements OnInit {
  memberships: Membership[] = [];
  isLoading: boolean = false;
  error: string = '';
  successMessage: string = '';

  // TODO: Get from auth service
  currentUserId: number = 1;

  constructor(
    private membershipService: MembershipService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMyMemberships();
  }

  loadMyMemberships(): void {
    this.isLoading = true;
    this.error = '';
    
    this.membershipService.getMyMemberships(this.currentUserId).subscribe({
      next: (memberships) => {
        // Filter memberships for current user
        this.memberships = memberships.filter(m => m.userId === this.currentUserId);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load your memberships. Please try again.';
        this.isLoading = false;
        console.error('Error loading memberships:', err);
      }
    });
  }

  viewClub(clubId: number): void {
    this.router.navigate(['/clubs', clubId]);
  }

  leaveMembership(membershipId: number): void {
    if (!confirm('Are you sure you want to leave this club?')) {
      return;
    }

    this.membershipService.deleteMembership(membershipId).subscribe({
      next: () => {
        this.successMessage = 'Successfully left the club';
        this.loadMyMemberships();
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (err) => {
        this.error = 'Failed to leave the club. Please try again.';
        console.error('Error leaving membership:', err);
      }
    });
  }
}
