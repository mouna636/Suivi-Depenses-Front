import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DepenseService } from '../gestion-depenses/depense.service';

Chart.register(...registerables);

@Component({
  selector: 'app-graphique',
  templateUrl: './graphique.component.html',
  styleUrls: ['./graphique.component.scss']
})
export class GraphiqueComponent implements OnInit {

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
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)', 
              'rgba(54, 162, 235, 0.5)', 
              'rgba(255, 206, 86, 0.5)', 
              'rgba(255, 270, 86, 0.5)', 
              'rgba(255, 140, 86, 0.5)',
              'rgba(75, 50, 10, 0.5)',
            ]
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      }
    
    
    
    );
    });
  }
 
 

}
