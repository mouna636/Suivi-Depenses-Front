import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BASE_URL } from './config';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  login(user: any): Observable<any> {
    console.log(user);

    return this.http
      .post<HttpResponse<any>>(
        BASE_URL + '/api/auth/signin',
        {
          username: user.username,
          password: user.password,
        },
        {
          observe: 'response',
        }
      )
      .pipe(
        map((response: HttpResponse<any>) => {
          const { token, _id, username } = response.body;
          const user = { id: _id, username };
          if (token) {
            this.localStorageService.addItem('token', token);
            this.localStorageService.addObject('user', user);
            window.location.href = '/dashboard';
            // this.router.navigate(['/dashboard']);
          } else {
            console.error('No token found in response headers');
          }
          return response;
        })
      );
  }

  register(user: any): Observable<any> {
    console.log(user);

    return this.http.post(BASE_URL + '/api/auth/signup', {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  isAuthenticated(): boolean {
    const token = this.localStorageService.getItem('token');
    return !!token;
  }

  logout() {
    this.localStorageService.removeManyItems(['token', 'user']);
    window.location.href = '/';
  }
}
