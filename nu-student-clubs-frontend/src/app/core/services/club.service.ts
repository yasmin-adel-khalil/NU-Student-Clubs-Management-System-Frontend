import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Club } from '../../shared/models/club.model';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private apiUrl = `${environment.apiUrl}/clubs`;

  constructor(private http: HttpClient) {}

  getAllClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.apiUrl);
  }

  getClubById(id: string): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/${id}`);
  }

  createClub(request: any): Observable<Club> {
    return this.http.post<Club>(this.apiUrl, request);
  }

  updateClub(id: string, request: any): Observable<Club> {
    return this.http.put<Club>(`${this.apiUrl}/${id}`, request);
  }

  deleteClub(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchClubs(query: string): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.apiUrl}/search?q=${query}`);
  }
}
