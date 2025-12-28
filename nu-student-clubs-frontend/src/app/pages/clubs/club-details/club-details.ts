import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../../../core/services/club.service';
import { MembershipService } from '../../../core/services/membership.service';
import { Club } from '../../../shared/models/club.model';

@Component({
  selector: 'app-club-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './club-details.html',
  styleUrl: './club-details.css'
})
export class ClubDetailsComponent implements OnInit {
  club: Club | null = null;
  isLoading: boolean = false;
  error: string = '';
  clubId: number = 0;
  isApplying: boolean = false;
  applicationSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clubService: ClubService,
    private membershipService: MembershipService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clubId = +params['id'];
      if (this.clubId) {
        this.loadClubDetails();
      }
    });
  }

  loadClubDetails(): void {
    this.isLoading = true;
    this.error = '';
    
    this.clubService.getClubById(this.clubId).subscribe({
      next: (club) => {
        this.club = club;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load club details. Please try again.';
        this.isLoading = false;
        console.error('Error loading club:', err);
      }
    });
  }

  applyForMembership(): void {
    // TODO: Get actual user ID from auth service
    const userId = 1; // Placeholder
    
    this.isApplying = true;
    this.error = '';
    this.applicationSuccess = false;
    
    this.membershipService.applyForMembership({
      userId: userId,
      clubId: this.clubId
    }).subscribe({
      next: () => {
        this.isApplying = false;
        this.applicationSuccess = true;
        setTimeout(() => {
          this.applicationSuccess = false;
        }, 5000);
      },
      error: (err) => {
        this.error = 'Failed to apply for membership. You may already be a member.';
        this.isApplying = false;
        console.error('Error applying for membership:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/clubs']);
  }
}
