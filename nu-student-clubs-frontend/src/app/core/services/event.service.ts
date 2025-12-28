import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  clubId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private base = '/events';

  constructor(private api: ApiService) {}

  getAllEvents(): Observable<Event[]> {
    return this.api.get<Event[]>(this.base);
  }

  getEventById(id: number): Observable<Event> {
    return this.api.get<Event>(`${this.base}/${id}`);
  }

  createEvent(request: any): Observable<Event> {
    return this.api.post<Event>(this.base, request);
  }

  updateEvent(id: number, request: any): Observable<Event> {
    return this.api.put<Event>(`${this.base}/${id}`, request);
  }

  deleteEvent(id: number): Observable<void> {
    return this.api.delete<void>(`${this.base}/${id}`);
  }

  getEventsByClub(clubId: number): Observable<Event[]> {
    return this.api.get<Event[]>(`${this.base}/club/${clubId}`);
  }
}
