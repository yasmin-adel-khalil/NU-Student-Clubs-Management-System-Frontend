import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Club, ClubResponse, ClubRequest } from '../../shared/models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  constructor(private api: ApiService) { }

  private base = '/clubs';

  // GET /clubs - Get all clubs with pagination
  getAllClubs(page: number = 0, size: number = 100): Observable<Club[]> {
    return this.api.get<Club[]>(`${this.base}?page=${page}&size=${size}`);
  }

  // GET /clubs/{id} - Get club by ID
  getClubById(id: number): Observable<ClubResponse> {
    return this.api.get<ClubResponse>(`${this.base}/${id}`);
  }

  // GET /clubs/search?name=X - Search clubs by name
  searchClubsByName(name: string): Observable<ClubResponse[]> {
    return this.api.get<ClubResponse[]>(`${this.base}/search?name=${encodeURIComponent(name)}`);
  }

  // GET /clubs/category/{category} - Get clubs by category
  getClubsByCategory(category: string): Observable<ClubResponse[]> {
    return this.api.get<ClubResponse[]>(`${this.base}/category/${encodeURIComponent(category)}`);
  }

  // POST /clubs - Create new club (admin only)
  createClub(club: ClubRequest): Observable<ClubResponse> {
    return this.api.post<ClubResponse>(this.base, club);
  }

  // PUT /clubs/{id} - Update club (admin only)
  updateClub(id: number, club: ClubRequest): Observable<ClubResponse> {
    return this.api.put<ClubResponse>(`${this.base}/${id}`, club);
  }

  // DELETE /clubs/{id} - Delete club (admin only)
  deleteClub(id: number): Observable<void> {
    return this.api.delete<void>(`${this.base}/${id}`);
  }
}
