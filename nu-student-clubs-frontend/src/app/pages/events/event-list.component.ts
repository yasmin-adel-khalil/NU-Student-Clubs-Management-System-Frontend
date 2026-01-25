import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../shared/models/event.model';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="max-w-6xl mx-auto p-6 space-y-8">
      <div class="flex flex-col gap-2">
        <h1 class="text-3xl font-bold text-gray-900">Upcoming Events</h1>
        <p class="text-gray-600">Discover and join exciting events happening at NU</p>
      </div>

      <div *ngIf="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p class="mt-4 text-gray-600">Loading events...</p>
      </div>

      <div *ngIf="!loading && events.length === 0" class="text-center py-12 bg-gray-50 rounded-lg">
        <p class="text-gray-600">No events available at the moment.</p>
      </div>

      <div *ngIf="!loading && events.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article *ngFor="let evt of events" 
                 class="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
          <div class="h-40 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span class="text-5xl">📅</span>
          </div>
          
          <div class="p-5 space-y-3">
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-1">{{ evt.title }}</h2>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <span>📍</span>
                <span>{{ evt.location }}</span>
              </div>
            </div>
            
            <p class="text-sm text-gray-700 line-clamp-2">{{ evt.description }}</p>
            
            <div class="pt-3 border-t border-gray-100">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-indigo-600">
                  {{ getEventDate(evt) | date: 'MMM dd, yyyy' }}
                </span>
                <span class="text-xs text-gray-500" *ngIf="evt.capacity">
                  {{ evt.attendeeCount || 0 }} / {{ evt.capacity }} attendees
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  `
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  loading = false;

  constructor() {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading = true;
    
    const now = new Date();
      
    this.events = [
        {
          id: '1',
          clubId: '1',
          title: 'Tech Workshop: Web Development',
          description: 'Learn modern web development techniques with hands-on projects',
          eventDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
          startDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
          endDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
          location: 'Tech Lab, Building A',
          capacity: 50,
          attendeeCount: 20,
          imageUrl: ''
        },
        {
          id: '2',
          clubId: '2',
          title: 'Football Tournament',
          description: 'Inter-club football championship - Join us for an exciting competition',
          startDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          eventDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Sports Complex',
          capacity: 100,
          attendeeCount: 45,
          imageUrl: 'https://via.placeholder.com/300x200',
          createdAt: now.toISOString(),
          updatedAt: now.toISOString()
        },
        {
          id: '3',
          clubId: '1',
          title: 'AI & Machine Learning Workshop',
          description: 'Introduction to artificial intelligence and machine learning fundamentals',
          startDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          eventDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Computer Lab 301',
          capacity: 40,
          attendeeCount: 15,
          imageUrl: 'https://via.placeholder.com/300x200',
          createdAt: now.toISOString(),
          updatedAt: now.toISOString()
        },
        {
          id: '4',
          clubId: '2',
          title: 'Basketball Championship',
          description: 'Annual basketball tournament for all students - Show your skills!',
          startDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          eventDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Basketball Court',
          capacity: 80,
          attendeeCount: 32,
          imageUrl: 'https://via.placeholder.com/300x200',
          createdAt: now.toISOString(),
          updatedAt: now.toISOString()
        },
        {
          id: '5',
          clubId: '1',
          title: 'Hackathon 2026',
          description: '24-hour coding competition with amazing prizes and networking opportunities',
          startDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
          eventDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Innovation Hub',
          capacity: 60,
          attendeeCount: 28,
          imageUrl: 'https://via.placeholder.com/300x200',
          createdAt: now.toISOString(),
          updatedAt: now.toISOString()
        },
        {
          id: '6',
          clubId: '2',
          title: 'Yoga & Fitness Session',
          description: 'Weekly yoga and fitness training for all levels - Improve your wellness',
          startDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          eventDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Gym Hall',
          capacity: 30,
          attendeeCount: 18,
          imageUrl: 'https://via.placeholder.com/300x200',
          createdAt: now.toISOString(),
          updatedAt: now.toISOString()
        },
        {
          id: '7',
          clubId: '1',
          title: 'Cybersecurity Seminar',
          description: 'Learn about the latest trends in cybersecurity and ethical hacking',
          startDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          eventDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Auditorium B',
          capacity: 100,
          attendeeCount: 67,
          imageUrl: 'https://via.placeholder.com/300x200',
          createdAt: now.toISOString(),
          updatedAt: now.toISOString()
        },
        {
          id: '8',
          clubId: '2',
          title: 'Swimming Competition',
          description: 'Inter-university swimming championship - Compete and win medals',
          startDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000).toISOString(),
          eventDate: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000).toISOString(),
          location: 'Olympic Pool',
          capacity: 50,
          attendeeCount: 22,
          imageUrl: 'https://via.placeholder.com/300x200',
          createdAt: now.toISOString(),
          updatedAt: now.toISOString()
        }
      ];
      
      this.loading = false;
  }

  getEventDate(evt: any): Date | string | null {
    return evt.eventDate || evt.startDate || null;
  }
}
