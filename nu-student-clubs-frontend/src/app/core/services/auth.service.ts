import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CurrentUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'STUDENT';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/api/auth/login';
  private signupUrl = '/api/auth/register';
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ token: string; user: CurrentUser }> {
    return this.http.post<{ token: string; user: CurrentUser }>(`${environment.apiBaseUrl}${this.loginUrl}`, { email, password })
      .pipe(tap(res => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          if (res?.user) {
            localStorage.setItem(this.currentUserKey, JSON.stringify(res.user));
          }
        }
      }));
  }

  signup(payload: any): Observable<{ token: string; user: CurrentUser }> {
    return this.http.post<{ token: string; user: CurrentUser }>(`${environment.apiBaseUrl}${this.signupUrl}`, payload)
      .pipe(tap(res => {
        if (res?.token) {
          localStorage.setItem('token', res.token);
          if (res?.user) {
            localStorage.setItem(this.currentUserKey, JSON.stringify(res.user));
          }
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem(this.currentUserKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): CurrentUser | null {
    const user = localStorage.getItem(this.currentUserKey);
    if (user) {
      try {
        return JSON.parse(user);
      } catch {
        return null;
      }
    }
    return null;
  }
}

