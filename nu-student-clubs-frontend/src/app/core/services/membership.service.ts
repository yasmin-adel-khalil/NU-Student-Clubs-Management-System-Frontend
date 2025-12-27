import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { MembershipResponse, MembershipRequest } from '../../shared/models/membership.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private api: ApiService) { }

  // GET /applications - Get all memberships
  getAllMemberships(): Observable<MembershipResponse[]> {
    return this.api.get<MembershipResponse[]>('/applications');
  }

  // GET /applications/{id} - Get membership by ID
  getMembershipById(id: number): Observable<MembershipResponse> {
    return this.api.get<MembershipResponse>(`/applications/${id}`);
  }

  // POST /applications - Create new membership application
  applyForMembership(request: MembershipRequest): Observable<MembershipResponse> {
    return this.api.post<MembershipResponse>('/applications', request);
  }

  // DELETE /applications/{id} - Delete membership (withdraw application)
  deleteMembership(id: number): Observable<void> {
    return this.api.delete<void>(`/applications/${id}`);
  }

  // Get user's memberships (filter by userId on frontend)
  getMyMemberships(userId: number): Observable<MembershipResponse[]> {
    return this.getAllMemberships();
  }
}
