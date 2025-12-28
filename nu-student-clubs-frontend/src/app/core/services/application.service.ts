import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Application {
  id: number;
  userId: number;
  clubId: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedAt: string;
  userName?: string;
  clubName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
 private apiUrl = `/api/applications`;;

  constructor(private http: HttpClient) {}

  getAllApplications(status?: string): Observable<Application[]> {
    const url = status ? `${this.apiUrl}?status=${status}` : this.apiUrl;
    return this.http.get<Application[]>(url);
  }

  getApplicationById(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

  getPendingApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}?status=PENDING`);
  }

  approveApplication(id: number): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/${id}/approve`, {});
  }

  rejectApplication(id: number, reason?: string): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/${id}/reject`, { reason });
  }

  getApplicationsByClub(clubId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/club/${clubId}`);
  }

  getApplicationsByUser(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/user/${userId}`);
  }
}
