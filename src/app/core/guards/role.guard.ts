import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: string[] = route.data['roles'] || [];
    
    if (expectedRoles.length === 0) {
      return true;
    }

    const hasRole = this.authService.hasAnyRole(expectedRoles);

    if (!hasRole) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}