import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const currentUser = authService.getCurrentUser();
  
  if (currentUser && currentUser.role === 'ADMIN') {
    return true;
  }
  
  // Redirect to home if not admin
  router.navigate(['/']);
  return false;
};
