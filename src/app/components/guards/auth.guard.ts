import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../../services/auth-service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    // ✅ Prevent execution outside browser (SSR safe)
    if (typeof window === 'undefined') return false;

    // ✅ Get token safely
    const token = this.auth.getToken();

    // ❌ No token → Redirect to login
    if (!token) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    // ✅ ROLE CHECK SECTION (Flexible Support)

    // 1️⃣ Array-based roles (recommended)
    const roles = route.data['roles'] as string[] | undefined;

    // 2️⃣ Single role support (for backward compatibility)
    const singleRole = route.data['role'] as string | undefined;

    const userRole = this.auth.role?.toLowerCase() || '';

    // If roles array exists
    if (roles && !roles.map(r => r.toLowerCase()).includes(userRole)) {
      this.router.navigate(['/un-authorized']);
      return false;
    }

    // If single role exists (like admin only)
    if (singleRole && singleRole.toLowerCase() !== userRole) {
      this.router.navigate(['/un-authorized']);
      return false;
    }

    // ✅ All checks passed
    return true;
  }
}