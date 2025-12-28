import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BoardMember,
  BoardMemberResponse,
  CreateBoardMemberRequest,
  UpdateBoardMemberRequest
} from '../../shared/models/board-member.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoardMemberService {
 private apiUrl = `/api/board-members`;
  constructor(private http: HttpClient) {}

  getAllBoardMembers(): Observable<BoardMemberResponse[]> {
    return this.http.get<BoardMemberResponse[]>(this.apiUrl);
  }

  getBoardMemberById(id: string): Observable<BoardMemberResponse> {
    return this.http.get<BoardMemberResponse>(`${this.apiUrl}/${id}`);
  }

  createBoardMember(request: CreateBoardMemberRequest): Observable<BoardMemberResponse> {
    return this.http.post<BoardMemberResponse>(this.apiUrl, request);
  }

  updateBoardMember(id: string, request: UpdateBoardMemberRequest): Observable<BoardMemberResponse> {
    return this.http.put<BoardMemberResponse>(`${this.apiUrl}/${id}`, request);
  }

  deleteBoardMember(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBoardMembersByClub(clubId: string): Observable<BoardMemberResponse[]> {
    return this.http.get<BoardMemberResponse[]>(`${this.apiUrl}/club/${clubId}`);
  }

  getBoardMembersByPosition(position: string): Observable<BoardMemberResponse[]> {
    return this.http.get<BoardMemberResponse[]>(`${this.apiUrl}/position/${position}`);
  }

  getActiveBoardMembers(): Observable<BoardMemberResponse[]> {
    return this.http.get<BoardMemberResponse[]>(`${this.apiUrl}/status/active`);
  }
}
