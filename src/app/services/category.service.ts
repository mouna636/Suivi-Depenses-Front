import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from './config';
import { Category } from '../models/Category';
import { LocalStorageService } from './local-storage.service';
import { DepenseService } from '../Components/gestion-depenses/depense.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  URI = `${BASE_URL}/api/categories`;

  constructor(
    private http: HttpClient,
    private local: LocalStorageService,
    private depS: DepenseService
  ) {}
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

  // getDepensesByCategory(categoryId: any): any {
  //   let depensesByCategory: any[] = [];
  //   this.depS.getAllDepensessByUserId().subscribe((depenses) => {
  //     depensesByCategory = depenses.filter(
  //       (depense) => depense.categoryId === categoryId
  //     );
  //     return depensesByCategory;
  //   });
  // }
  getCountCategories() {
    return this.http.get<number>(`${this.URI}/count`);
  }
  getExceededCategories() {
    let exeededCats: any[] = [];
    this.getAllCategoriesByUserId().subscribe((categories) => {
      categories.forEach((category) => {
        let depensesByCategory: any[] = [];
        this.depS.getAllDepensessByUserId().subscribe((depenses) => {
          console.log('depenses', depenses);

          depensesByCategory = depenses.filter(
            (depense: any) => depense.categoryId._id === category._id
          );
          let total = 0;
          depensesByCategory.forEach((depense) => {
            total += Number(depense.montant);
          });

          if (total > +category.budget) {
            exeededCats.push({ category, total: +category.budget });
          }
        });
      });
    });
    return exeededCats;
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
