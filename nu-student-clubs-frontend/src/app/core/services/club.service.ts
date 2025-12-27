import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Club, ClubResponse, ClubRequest } from '../../shared/models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private api: ApiService) { }

  // GET /clubs - Get all clubs with pagination
  getAllClubs(page: number = 0, size: number = 100): Observable<any> {
    return this.api.get<any>(`/clubs?page=${page}&size=${size}`);
  }

  // GET /clubs/{id} - Get club by ID
  getClubById(id: number): Observable<ClubResponse> {
    return this.api.get<ClubResponse>(`/clubs/${id}`);
  }

  // GET /clubs/search?name=X - Search clubs by name
  searchClubsByName(name: string): Observable<ClubResponse[]> {
    return this.api.get<ClubResponse[]>(`/clubs/search?name=${name}`);
  }

  // GET /clubs/category/{category} - Get clubs by category
  getClubsByCategory(category: string): Observable<ClubResponse[]> {
    return this.api.get<ClubResponse[]>(`/clubs/category/${category}`);
  }

  // POST /clubs - Create new club (admin only)
  createClub(club: ClubRequest): Observable<ClubResponse> {
    return this.api.post<ClubResponse>('/clubs', club);
  }

  // PUT /clubs/{id} - Update club (admin only)
  updateClub(id: number, club: ClubRequest): Observable<ClubResponse> {
    return this.api.put<ClubResponse>(`/clubs/${id}`, club);
  }

  // DELETE /clubs/{id} - Delete club (admin only)
  deleteClub(id: number): Observable<void> {
    return this.api.delete<void>(`/clubs/${id}`);
  }
}
