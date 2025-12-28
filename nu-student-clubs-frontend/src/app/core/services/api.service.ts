
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(endpoint: string) {
    // endpoint أمثلة: '/api/clubs', '/api/committees'
    return this.http.get<T>(endpoint);
  }

  post<T>(endpoint: string, data: any) {
    return this.http.post<T>(endpoint, data);
  }

  put<T>(endpoint: string, data: any) {
    return this.http.put<T>(endpoint, data);
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(endpoint);
  }
}
