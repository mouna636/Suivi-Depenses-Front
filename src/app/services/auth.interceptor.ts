import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getItem('token');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    } else {
      console.log('No token found');
      return next.handle(req);
    }
  }
}
