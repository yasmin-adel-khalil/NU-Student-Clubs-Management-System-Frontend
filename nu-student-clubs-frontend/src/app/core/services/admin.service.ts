import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin, AdminResponse, CreateAdminRequest, UpdateAdminRequest } from '../../shared/models/admin.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/api/admin`;

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<AdminResponse[]> {
    return this.http.get<AdminResponse[]>(this.apiUrl);
  }

  getAdminById(id: string): Observable<AdminResponse> {
    return this.http.get<AdminResponse>(`${this.apiUrl}/${id}`);
  }

  createAdmin(request: CreateAdminRequest): Observable<AdminResponse> {
    return this.http.post<AdminResponse>(this.apiUrl, request);
  }

  updateAdmin(id: string, request: UpdateAdminRequest): Observable<AdminResponse> {
    return this.http.put<AdminResponse>(`${this.apiUrl}/${id}`, request);
  }

  deleteAdmin(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAdminsByRole(role: string): Observable<AdminResponse[]> {
    return this.http.get<AdminResponse[]>(`${this.apiUrl}/role/${role}`);
  }
}
