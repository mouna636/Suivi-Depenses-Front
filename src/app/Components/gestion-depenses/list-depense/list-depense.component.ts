import { Component, OnInit } from '@angular/core';
import { DepenseService } from '../depense.service';
import { Router } from '@angular/router';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-list-depense',
  templateUrl: './list-depense.component.html',
  styleUrls: ['./list-depense.component.scss'],
})
export class ListDepenseComponent implements OnInit {
  depenses: any[] = [];
  constructor(
    private depenseService: DepenseService,
    private router: Router,
    private papa: Papa
  ) {}
  ngOnInit() {
    this.getAllDepenses();
  }
  getAllDepenses() {
    this.depenseService.getAllDepensessByUserId().subscribe((data) => {
      this.depenses = data;
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
