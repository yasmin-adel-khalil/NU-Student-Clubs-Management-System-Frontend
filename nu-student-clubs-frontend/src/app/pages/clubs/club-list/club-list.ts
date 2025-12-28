import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubService } from '../../../core/services/club.service';
import { Club } from '../../../shared/models/club.model';

@Component({
  selector: 'app-club-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './club-list.html',
  styleUrl: './club-list.css'
})
export class ClubListComponent implements OnInit {
  clubs: Club[] = [];
  filteredClubs: Club[] = [];
  searchTerm: string = '';
  filterCategory: string = '';
  error: string = '';
  isLoading: boolean = false;

  categories: string[] = [
    'Technology',
    'Arts',
    'Sports',
    'Academic',
    'Cultural',
    'Social',
    'Environmental',
    'Business'
  ];

  constructor(
    private clubService: ClubService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClubs();
  }

  loadClubs(): void {
    this.isLoading = true;
    this.error = '';
    
    this.clubService.getAllClubs(0, 100).subscribe({
      next: (response) => {
        // Support both paginated responses ({ content: [...] }) and plain arrays
        const items = Array.isArray(response) ? response : (response as any)?.content;
        this.clubs = items || [];
        this.filteredClubs = [...this.clubs];
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load clubs. Please try again.';
        this.isLoading = false;
        console.error('Error loading clubs:', err);
      }
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredClubs = this.clubs.filter(club => {
      const matchesSearch = !this.searchTerm || 
        club.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        club.description?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.filterCategory || 
        club.category === this.filterCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  viewClubDetails(clubId: number): void {
    this.router.navigate(['/clubs', clubId]);
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.filterCategory = '';
    this.filteredClubs = [...this.clubs];
  }
}
