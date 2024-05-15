import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  addItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  getItem(key: string) {
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

  getObject(key: string) {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
  }
}
