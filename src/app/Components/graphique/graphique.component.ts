import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from 'chart.js/auto';
import { Chart,registerables } from 'node_modules/chart.js';
import { DepenseService } from '../gestion-depenses/depense.service';
Chart.register(...registerables)
@Component({
  selector: 'app-graphique',
  templateUrl: './graphique.component.html',
  styleUrls: ['./graphique.component.scss']
})
export class GraphiqueComponent implements OnInit{

  constructor(private depenseService: DepenseService) { }

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    this.depenseService.getAllDepensessByUserId().subscribe(data => {
      const categoriesMap = new Map<string, number>();
  
      data.forEach(depense => {
        const categorie = depense.categoryId.name;
        const montant = parseFloat(depense.montant); 
  
        if (!isNaN(montant)) { 
          if (categoriesMap.has(categorie)) {
            categoriesMap.set(categorie, categoriesMap.get(categorie)! + montant);
          } else {
            categoriesMap.set(categorie, montant);
          }
        }
      });
  
      const labels = Array.from(categoriesMap.keys());
      const dataValues = Array.from(categoriesMap.values());
  

      new Chart("piechart", {
        type: 'bar',
      
          data: {
            labels: labels,
            datasets: [{
              label: 'Montant par Catégorie',
              data: dataValues,
              borderWidth: 1
             
            }]
          },
         
        
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });


 } ) } }








     
     
        