import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { roles } from '../constants/user';
// import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthService {

  currentUserStream: ReplaySubject<any> = new ReplaySubject(1);
  currentUser: any = null;

  constructor(
    // private cookieService: CookieService
    ) { }

  getToken() {
    return localStorage.getItem('token') || '';
    // return this.cookieService.get('token');
  }

  setToken(token: string) {
    // this.cookieService.set('token', token);
    localStorage.setItem('token', token);
  }

  signOut() {
    localStorage.removeItem('token');
    // this.cookieService.delete('token');
    this.changeUser(null);
    setTimeout(() => location.reload(), 500);
  }

  changeUser(user: any) {
    this.currentUser = user;
    this.currentUserStream.next(user);
  }

  getCurrentUserStream() {
    return this.currentUserStream;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isSigned() {
    return this.currentUser && this.currentUser.role === roles.USER;
  }

  isActivated() {
    return this.currentUser && this.currentUser.role === roles.USER && this.currentUser.isActivated;
  }
}
