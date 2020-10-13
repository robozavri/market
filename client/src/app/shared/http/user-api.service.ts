import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class UserApiService {

  constructor(private http: HttpClient) { }

  public getMe(): Observable<any> {
    return this.http.get(`${API_URL}/api/users/me`);
  }

  public signIn(data: any): Observable<any> {
    return this.http.post(`${API_URL}/api/users/sign-in`, data);
  }

  public signUp(data: any): Observable<any> {
    return this.http.post(`${API_URL}/api/users/sign-up`, data);
  }

  public signOut(): Observable<any> {
    return this.http.post(`${API_URL}/api/users/sign-out`, {});
  }

  public resendActivationLink(): Observable<any> {
    return this.http.post(`${API_URL}/api/users/resend/activation-token`, {});
  }

  public requestPasswordReset(data: any): Observable<any> {
    return this.http.patch(`${API_URL}/api/users/password/reset/request`, data);
  }

  public resetPassword(data: any): Observable<any> {
    return this.http.patch(`${API_URL}/api/users/password/reset`, data);
  }

  public updatePassword(data: any): Observable<any> {
    return this.http.patch(`${API_URL}/api/users/password/update`, data);
  }

  public emailExists(email: string): Observable<any> {
    return this.http.get(`${API_URL}/api/users/email/${email}/validate`);
  }

}
