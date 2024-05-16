import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DepenseService } from '../gestion-depenses/depense.service';
import { DateTime } from 'luxon';

Chart.register(...registerables);

@Component({
  selector: 'app-grahe-depence-date',
  templateUrl: './grahe-depence-date.component.html',
  styleUrls: ['./grahe-depence-date.component.scss']
})
export class GraheDepenceDateComponent implements OnInit {

    constructor(private depenseService: DepenseService) { }
  
    ngOnInit(): void {
      this.renderChart();
      
    }
  
    renderChart(): void {
      this.depenseService.getAllDepensessByUserId().subscribe(data => {
        const categoriesMap = new Map<string, number>();
    
        data.forEach(depense => {
          const date = depense.date;
          const montant = parseFloat(depense.montant); 
    
          if (!isNaN(montant)) { 
            if (categoriesMap.has(date)) {
              categoriesMap.set(date, categoriesMap.get(date)! + montant);
            } else {
              categoriesMap.set(date, montant);
            }
          }
        });
    
        const labels = Array.from(categoriesMap.keys());
        const dataValues = Array.from(categoriesMap.values());
    
        new Chart("chart", {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Montant par Date',
              data: dataValues,
              borderWidth: 1,
              backgroundColor: [ 
                'rgba(150, 50, 132, 0.5)',
                'rgba(54, 162, 310, 0.5)',
                'rgba(255, 140, 86, 0.5)',
                'rgba(75, 50, 192, 0.5)',
                'rgba(140, 102, 150, 0.5)',
                'rgba(250, 159, 64, 0.5)', 
                'rgba(0, 255, 0, 0.5)' 
                
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
  