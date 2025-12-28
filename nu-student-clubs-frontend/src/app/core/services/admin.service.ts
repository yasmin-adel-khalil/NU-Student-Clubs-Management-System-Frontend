
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  AdminResponse,
  CreateAdminRequest,
  UpdateAdminRequest
} from '../../shared/models/admin.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly apiUrl = `${environment.apiBaseUrl}/admins`;

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<AdminResponse[]> {
    return this.http.get<AdminResponse[]>(this.apiUrl).pipe(
      catchError(this.handleError('getAllAdmins'))
    );
  }

  getAdminById(id: string): Observable<AdminResponse> {
    return this.http.get<AdminResponse>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError('getAdminById'))
    );
  }

  createAdmin(request: CreateAdminRequest): Observable<AdminResponse> {
    return this.http.post<AdminResponse>(this.apiUrl, request).pipe(
      catchError(this.handleError('createAdmin'))
    );
  }

  updateAdmin(id: string, request: UpdateAdminRequest): Observable<AdminResponse> {
    return this.http.put<AdminResponse>(`${this.apiUrl}/${id}`, request).pipe(
      catchError(this.handleError('updateAdmin'))
    );
  }

  deleteAdmin(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError('deleteAdmin'))
    );
  }

  getAdminsByRole(role: string): Observable<AdminResponse[]> {
    return this.http.get<AdminResponse[]>(`${this.apiUrl}/role/${role}`).pipe(
      catchError(this.handleError('getAdminsByRole'))
    );
  }

  private handleError(op: string) {
    return (error: any) => {
      console.error(`[AdminService] ${op} failed:`, error);
      return throwError(() => error);
    };
  }
}
