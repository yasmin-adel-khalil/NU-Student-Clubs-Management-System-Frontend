import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email: string, password: string) {
    // TODO: Implement login logic
  }

  logout() {
    // TODO: Implement logout logic
  }

  isAuthenticated(): boolean {
    // TODO: Implement authentication check
    return false;
  }
}
