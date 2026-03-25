// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
// import { AuthService } from "../../services/auth-service";

// @Injectable({ providedIn: 'root' })
// export class AdminGuard implements CanActivate {

//     constructor(private _router: Router, private auth: AuthService) { }

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

//         const token = this.auth.token;
//         const role = this.auth.role;

//         if (token && role?.toLowerCase() === 'admin') {
//             return true;
//         }

//         this._router.navigate(['/un-authorized']);
//         return false;
//     }
// }
