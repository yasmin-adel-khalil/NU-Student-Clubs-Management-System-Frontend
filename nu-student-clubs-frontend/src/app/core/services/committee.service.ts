import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Committee,
  CommitteeResponse,
  CommitteeWithMembers,
  CreateCommitteeRequest,
  UpdateCommitteeRequest
} from '../../shared/models/committee.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommitteeService {
  private apiUrl = `${environment.apiUrl}/api/committees`;

  constructor(private http: HttpClient) {}

  getAllCommittees(): Observable<CommitteeResponse[]> {
    return this.http.get<CommitteeResponse[]>(this.apiUrl);
  }

  getCommitteeById(id: string): Observable<CommitteeWithMembers> {
    return this.http.get<CommitteeWithMembers>(`${this.apiUrl}/${id}`);
  }

  createCommittee(request: CreateCommitteeRequest): Observable<CommitteeResponse> {
    return this.http.post<CommitteeResponse>(this.apiUrl, request);
  }

  updateCommittee(id: string, request: UpdateCommitteeRequest): Observable<CommitteeResponse> {
    return this.http.put<CommitteeResponse>(`${this.apiUrl}/${id}`, request);
  }

  deleteCommittee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCommitteesByClub(clubId: string): Observable<CommitteeResponse[]> {
    return this.http.get<CommitteeResponse[]>(`${this.apiUrl}/club/${clubId}`);
  }

  getActiveCommittees(): Observable<CommitteeResponse[]> {
    return this.http.get<CommitteeResponse[]>(`${this.apiUrl}/status/active`);
  }

  addMemberToCommittee(committeeId: string, userId: string): Observable<CommitteeResponse> {
    return this.http.post<CommitteeResponse>(`${this.apiUrl}/${committeeId}/members/${userId}`, {});
  }

  removeMemberFromCommittee(committeeId: string, userId: string): Observable<CommitteeResponse> {
    return this.http.delete<CommitteeResponse>(`${this.apiUrl}/${committeeId}/members/${userId}`);
  }

  getCommitteeMembers(committeeId: string): Observable<CommitteeWithMembers> {
    return this.http.get<CommitteeWithMembers>(`${this.apiUrl}/${committeeId}/members`);
  }
}
