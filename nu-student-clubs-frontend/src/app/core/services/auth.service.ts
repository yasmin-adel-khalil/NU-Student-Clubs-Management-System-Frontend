import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/api/auth/login';
  private signupUrl = '/api/auth/signup';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.apiBaseUrl}${this.loginUrl}`, { email, password })
      .pipe(tap(res => {
        if (res?.token) localStorage.setItem('token', res.token);
      }));
  }

  signup(payload: any): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${environment.apiBaseUrl}${this.signupUrl}`, payload)
      .pipe(tap(res => {
        if (res?.token) localStorage.setItem('token', res.token);
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
