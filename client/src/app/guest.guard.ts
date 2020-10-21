import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserApiService } from './shared/http/user-api.service';
import { User } from './shared/models/user';
import { AuthService } from './shared/services/auth.service';
import { SocketService } from './shared/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  user: User;

  constructor(
    private authService: AuthService,
    private userApiService: UserApiService,
    private socketService: SocketService,
    private router: Router
    ) {}

  // canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot
  //   ): boolean {
  //     console.log('this.authService.isSigned()',this.authService.isSigned());
  //     if (this.authService.isSigned()) {
  //       return true;
  //     }
  //     return false;
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | boolean {

      if (this.authService.isSigned()) {  console.log('GuestGuard isSigned')
         return true;
      }

      if (this.authService.hasToken()) { console.log('GuestGuard has token true')
        return this.userApiService.getMe().pipe(map((user) => {
          this.authService.changeUser(user);  console.log('GuestGuard user',user)
          return true;
        }));
      }

      return true;
  }
}
