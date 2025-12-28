
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private buildUrl(endpoint: string): string {
    // Use absolute URLs as-is
    if (/^https?:\/\//i.test(endpoint)) return endpoint;
    const base = environment.apiBaseUrl.replace(/\/$/, '');
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${base}${path}`;
  }

  get<T>(endpoint: string) {
    // endpoint أمثلة: '/api/clubs', '/api/committees'
    return this.http.get<T>(this.buildUrl(endpoint));
  }

  post<T>(endpoint: string, data: any) {
    return this.http.post<T>(this.buildUrl(endpoint), data);
  }

  put<T>(endpoint: string, data: any) {
    return this.http.put<T>(this.buildUrl(endpoint), data);
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(this.buildUrl(endpoint));
  }
}
