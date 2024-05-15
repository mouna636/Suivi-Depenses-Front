import { Component, OnInit } from '@angular/core';
import { DepenseService } from '../depense.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-depense',
  templateUrl: './list-depense.component.html',
  styleUrls: ['./list-depense.component.scss'],
})
export class ListDepenseComponent implements OnInit {
  depenses: any[] = [];

  startDate: string = '';
  endDate: string = '';

  selectedCategory: string = '';

  categories: any[] = [];
  categoriesFilter: any[] = [];

  constructor(
    private depenseService: DepenseService,
    private cat: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllDepenses();

    this.cat.getAllCategoriesByUserId().subscribe(
      (data) => {
        this.categories = data;
        console.log('Categories:', this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  getAllDepenses() {
    this.depenseService.getAllDepensessByUserId().subscribe((data) => {
      this.depenses = data;
      this.categoriesFilter = data;
    });
  }

  /*  deleteDepense(id:number){
    this.depenseService.deleteOffre(id).subscribe((res)=>
      {
        console.log(res);
      }
    )
   }
   gotToEditOffre(x: any) {
    this.router.navigate([`update-offre/${x}`]);
  } */

  // Méthode appelée lors du changement de la plage de dates
  onDateRangeChange() {
    // Assurez-vous que les dates de début et de fin sont définies
    if (this.startDate && this.endDate) {
      // Charge les dépenses filtrées par la plage de dates spécifiée
      this.loadDepensesByDateRange();
    } else {
      // Si les dates ne sont pas définies, charge toutes les dépenses
      this.getAllDepenses();
    }
  }

  // Charge les dépenses en fonction de la plage de dates spécifiée
  loadDepensesByDateRange(): void {
    this.depenseService
      .filterDepensesByDateRange(this.startDate, this.endDate)
      .subscribe(
        (data) => {
          this.depenses = data;
        },
        (error) => {
          console.error('Error fetching depenses by date range:', error);
        }
      );
  }

  // Charge les dépenses triées par montant
  // sortDepensesByAmount(sortBy: any): void {

  //   this.depenseService.sortDepensesByAmount(sortBy).subscribe(
  //     (data) => {
  //       this.depenses = data;
  //       console.log('Depenses triées par montant:', this.depenses);
  //     },
  //     (error) => {
  //       console.error('Error fetching depenses by amount:', error);
  //       if (error instanceof HttpErrorResponse) {
  //         console.error(`HTTP Error Status: ${error.status}, ${error.statusText}`);
  //       }
  //     }
  //   );
  // }

  sortDepensesByAmount(sortBy: 'asc' | 'desc'): void {
    this.depenses.sort((a, b) => {
      if (sortBy === 'asc') {
        return a.montant - b.montant;
      } else {
        return b.montant - a.montant;
      }
    });
  }

  // Filtre par catégorie
  filterDepensesByCategory(categoryId: any): void {
    if (categoryId.target.value === '') {
      this.depenses = this.categoriesFilter;

      
    } else {
      this.depenses = this.categoriesFilter.filter(
        (depense) => depense.categoryId._id === categoryId.target.value
      );
    }
  }
}