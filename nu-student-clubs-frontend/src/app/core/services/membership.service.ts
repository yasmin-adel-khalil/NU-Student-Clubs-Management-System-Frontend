import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { MembershipResponse, MembershipRequest } from '../../shared/models/membership.model';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(private api: ApiService) { }

  // GET /memberships - Get all memberships
  getAllMemberships(): Observable<MembershipResponse[]> {
    return this.api.get<MembershipResponse[]>('/memberships');
  }

  // GET /memberships/{id} - Get membership by ID
  getMembershipById(id: number): Observable<MembershipResponse> {
    return this.api.get<MembershipResponse>(`/memberships/${id}`);
  }

  // POST /memberships - Create new membership
  applyForMembership(request: MembershipRequest): Observable<MembershipResponse> {
    return this.api.post<MembershipResponse>('/memberships', request);
  }

  // DELETE /memberships/{id}
  deleteMembership(id: number): Observable<void> {
    return this.api.delete<void>(`/memberships/${id}`);
  }

  // Get user's memberships (filter by userId on frontend)
  getMyMemberships(userId: number): Observable<MembershipResponse[]> {
    return this.getAllMemberships();
  }
}
