import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from '../../shared/models/club.model';

@Component({
  selector: 'app-club-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-3xl mx-auto p-4 space-y-6">
      <div class="flex flex-col gap-1">
        <h1 class="text-2xl font-semibold">Student Clubs</h1>
        <p class="text-sm text-gray-600">Join one of our vibrant clubs at Nile University</p>
      </div>

      <div class="flex flex-col gap-4">
        <article *ngFor="let club of clubs" 
                 (click)="viewClub(club.id.toString())" 
                 class="rounded-lg border bg-white shadow-sm p-6 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow">
          <div class="flex-shrink-0">
            <img [src]="club.logo || 'https://via.placeholder.com/80'" 
                 [alt]="club.name"
                 class="w-20 h-20 rounded-lg object-cover bg-gray-100">
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-gray-900">{{ club.name }}</h2>
            <p class="text-sm text-gray-600 mb-2">{{ club.category }}</p>
            <p class="text-sm text-gray-700">{{ club.description }}</p>
          </div>
          <div class="flex-shrink-0 text-center">
            <p class="text-2xl font-bold text-indigo-600">{{ club.memberCount }}</p>
            <p class="text-xs text-gray-500">members</p>
          </div>
        </article>
      </div>
    </section>
  `
})
export class ClubListComponent {
  clubs: Club[] = [
    {
      id: 1,
      name: 'IEEE',
      category: 'Technology & Engineering',
      description: 'Institute of Electrical and Electronics Engineers student chapter. Join us for tech talks, robotics workshops, and innovation competitions.',
      president: 'Ahmed Hassan',
      email: 'ieee@nu.edu.eg',
      memberCount: 187,
        logo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23003DA5" width="200" height="200"/><text x="50%" y="50%" font-size="32" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">IEEE</text></svg>',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      name: 'E CLUB',
      category: 'Entrepreneurship',
      description: 'Entrepreneurs Club connecting aspiring business leaders. Startup pitch nights, mentorship, and networking events every month.',
      president: 'Fatima Khalil',
      email: 'eclub@nu.edu.eg',
      memberCount: 142,
        logo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23FF6B35" width="200" height="200"/><text x="50%" y="50%" font-size="48" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">E</text></svg>',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 3,
      name: 'NIMUN',
      category: 'Debate & Model UN',
      description: 'Nile International Model United Nations. Develop public speaking and diplomatic skills through simulated UN conferences.',
      president: 'Zainab Hassan',
      email: 'nimun@nu.edu.eg',
      memberCount: 95,
        logo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="white" width="200" height="200" stroke="%23003E9F" stroke-width="2"/><circle cx="100" cy="100" r="70" fill="none" stroke="%23003E9F" stroke-width="3"/><polygon points="100,40 130,70 130,130 70,130 70,70" fill="%23003E9F"/></svg>',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 4,
      name: 'Book Club',
      category: 'Literature & Arts',
      description: 'Passionate readers discussing literature, new releases, and diverse perspectives. Monthly book discussions and author talks.',
      president: 'Leila Mohamed',
      email: 'bookclub@nu.edu.eg',
      memberCount: 78,
        logo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%238B4513" width="200" height="200"/><rect x="50" y="60" width="50" height="70" fill="white" stroke="%23654321" stroke-width="2"/><rect x="100" y="60" width="50" height="70" fill="%23FDD5B1" stroke="%23654321" stroke-width="2"/><line x1="75" y1="60" x2="75" y2="130" stroke="%23654321" stroke-width="1"/></svg>',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 5,
      name: 'RPM',
      category: 'Motorsports & Racing',
      description: 'Racing and Performance Motor club. Build race cars, organize drag races, and compete in motorsport events.',
      president: 'Mohammed Ali',
      email: 'rpm@nu.edu.eg',
      memberCount: 156,
        logo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23CC0000" width="200" height="200"/><circle cx="60" cy="120" r="25" fill="none" stroke="white" stroke-width="3"/><circle cx="140" cy="120" r="25" fill="none" stroke="white" stroke-width="3"/><path d="M70 80 L130 80 L120 110 L80 110 Z" fill="white"/><text x="50%" y="60" font-size="20" font-weight="bold" fill="white" text-anchor="middle">RPM</text></svg>',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 6,
      name: 'EAGLES',
      category: 'Sports & Athletics',
      description: 'Multi-sport athletic club promoting fitness, teamwork, and competitive spirit. Play football, basketball, volleyball and more.',
      president: 'Hassan Ibrahim',
      email: 'eagles@nu.edu.eg',
      memberCount: 234,
        logo: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="%23FFD700" width="200" height="200"/><path d="M100,30 L120,70 L160,70 L130,100 L145,140 L100,110 L55,140 L70,100 L40,70 L80,70 Z" fill="%23CC0000"/><text x="50%" y="170" font-size="16" font-weight="bold" fill="%23CC0000" text-anchor="middle">EAGLES</text></svg>',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  constructor(private router: Router) {}

  viewClub(clubId: string): void {
    this.router.navigate(['/clubs', clubId]);
  }
}
