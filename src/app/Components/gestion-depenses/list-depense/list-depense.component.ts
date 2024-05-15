import { Component, OnInit } from '@angular/core';
import { DepenseService } from '../depense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-depense',
  templateUrl: './list-depense.component.html',
  styleUrls: ['./list-depense.component.scss']
})
export class ListDepenseComponent implements OnInit {
  depenses: any[] = [];
  constructor(private depenseService:DepenseService,private router:Router){}
  ngOnInit(){
   this.getAllDepenses();
   }
   getAllDepenses(){
    this.depenseService.getAllDepensessByUserId().subscribe(
     (data) =>
      {
 this.depenses=data;
    })
   }
  }
  

