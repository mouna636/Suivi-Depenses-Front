import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from './config';
import { Category } from '../models/Category';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  URI = `${BASE_URL}/api/categories`;

  constructor(private http: HttpClient, private local: LocalStorageService) {}
  addCategory(category: Category) {
    category.userId = this.local.getObject('user').id;
    console.log(category);

    return this.http.post<Category>(this.URI, { category });
  }

  getAllCategoriesByUserId() {
    return this.http.get<Category[]>(
      `${this.URI}/user/${this.local.getObject('user').id}`
    );
  }

  getCategoryById(id: string) {
    return this.http.get<Category>(`${this.URI}/${id}`);
  }

  updateCategory(id: string, category: Category) {
    return this.http.put<Category>(`${this.URI}/${id}`, { category });
  }

  deleteCategory(id: string) {
    return this.http.delete<Category>(`${this.URI}/${id}`);
  }
}
