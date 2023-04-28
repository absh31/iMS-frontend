import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
// export class AuthGuard implements CanActivate, CanActivateChild {
//   constructor(
//     private router: Router,
//     private route: ActivatedRoute,
//     private authService: AuthService
//   ) {}

//   public canActivate(route: ActivatedRouteSnapshot) {
//     if (this.authService.getSession()) {
//       return new Promise((resolve, reject) => {
//         return resolve(true);
//       });
//     }
//   }

//   public async canActivateChild(
//     route: ActivatedRouteSnapshot
//   ): Promise<boolean> {
//     this.router.navigate(['/login'], { relativeTo: this.route });
//     return await this.authService.getSession();
//   }

//   public canLoad(): any {}
// }
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    var isAuthenticated = this.authService.getSession();
    if (!isAuthenticated) {
      this.router.navigate(['/login'], { relativeTo: this.route });
    }
    return true;
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    var isAuthenticated = this.authService.getSession();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
