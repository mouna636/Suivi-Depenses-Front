import { Injectable } from '@angular/core';

import { BASE_URL } from './config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private http: HttpClient) {}

  addItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  getItem(key: string) {
    if (key === 'user') {
      this.getCurrentUser()?.subscribe((usr) => {
        return usr;
      });
    }
    return localStorage.getItem(key);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
  removeManyItems(array: Array<string>) {
    array.forEach((key) => {
      localStorage.removeItem(key);
    });
  }

  clear() {
    localStorage.clear();
  }

  addObject(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(BASE_URL + '/api/auth/user');
  }
}
