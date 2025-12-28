import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private api: ApiService) { }

  getCurrentUser(): Observable<any> {
    return this.api.get<any>('/api/user/profile');
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.api.put<any>('/api/user/profile', userData);
  }
}
