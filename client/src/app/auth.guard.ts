import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserApiService } from './shared/http/user-api.service';
import { AuthService } from './shared/services/auth.service';
import { SocketService } from './shared/services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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
    ): Observable<boolean> {
    return this.userApiService.getMe().pipe(map((user) => {
      this.authService.changeUser(user); console.log('AuthGuard user',user)
      if (this.authService.isSigned()) {
        // this.socketService.init();
        return true;
      }
      this.router.navigate(['/home']);
      return false;
    }));
  }
}
