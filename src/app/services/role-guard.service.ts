import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import decode from 'jwt-decode';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable()
export class RoleGuard {
  userProfile: any;
token:any
tokenPayload:any
  constructor(private authService: AuthService, private toastService: ToastService,private router:Router) {}
  //   return this.authService.isLoggedIn().pipe(
  //     map((canActivateProtectedRoutes: boolean) => {
  //       if (canActivateProtectedRoutes) {
  //         // role check only if route contain data.role
  //         // https://javascript.plainenglish.io/4-ways-to-check-whether-the-property-exists-in-a-javascript-object-20c2d96d8f6e
  //         if (!!route.data.role) {
  //           const routeRoles = route.data.role;
  //           //this.showToaster('Role guard', 'Require role ' + routeRoles);

  //           this.userProfile = this.authService.identityClaims;
  //           if (!!this.userProfile.role) {
  //             const userRoles = this.userProfile.role;
  //             //this.showToaster('Role guard', 'User profile role ' + userRoles);

  //             if (userRoles.includes(routeRoles)) {
  //               // user's roles contains route's role
  //               return true;
  //             } else {
  //               // toaster-display role user needs to have to access this route;
  //               this.showToaster('Access denied', 'You do not have role ' + routeRoles);
  //             }
  //           }
  //         }
  //       }
  //       return false;
  //     })
  //   );
  // }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config    // on the data property
    const expectedRole = route.data['expectedRole'];
     this.token = localStorage.getItem('token');
     this.tokenPayload = decode(this.token);
     console.log(this.tokenPayload)
    if (
      this.authService.isLoggedIn() ||
      this.tokenPayload.role !== expectedRole
    ) {
this.showToaster('Access denied', 'You do not have role ' + expectedRole);

      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  // ngbmodal service
  showToaster(title: string, message: string) {
    this.toastService.show(message, {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true,
      headertext: title,
    });
  }
}
