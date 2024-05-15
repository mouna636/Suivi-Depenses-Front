import { Component, OnInit } from '@angular/core';
import { DepenseService } from '../depense.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';
import { Subscription } from 'rxjs';
import { Papa } from 'ngx-papaparse';

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
    private router: Router,
    private papa: Papa
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


  
  
  
 

  
  onDateRangeChange() {
   
    if (this.startDate && this.endDate) {
      
      this.loadDepensesByDateRange();
    } else {
      
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

  // Trie les dépenses par montant

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


  csvData: [] = [];
  csvError = '';
  onAddCSVData() {
    if (this.csvData.length == 0) return;
    this.csvData.forEach((depense: any) => {
      if (depense.date && depense.montant && depense.description) {
        this.depenseService.addDepense(depense).subscribe({
          next: (data: any) => {
            this.getAllDepenses();
          },
          error: (error) => {
            console.error('There was an error!', error);
            this.csvError = error;
          },
        });
      }
    });
    console.log(this.csvData);
  }

  readCsvData(event: any): any {
    const file = event.target.files[0];

    if (file) {
      this.papa.parse(file, {
        header: true,
        complete: (results: any) => {
          this.csvData = results.data;
        },
        error: (err: any) => console.log(err),
      });
    }
  }
}
