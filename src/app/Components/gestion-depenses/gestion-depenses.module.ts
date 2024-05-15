import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepenseComponent } from './add-depense/add-depense.component';
import { DepenseService } from './depense.service';
import { ListDepenseComponent } from './list-depense/list-depense.component';




@NgModule({
  declarations: [
    AddDepenseComponent,DepenseService, ListDepenseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GestionDepensesModule { }
