import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDepenseComponent } from './add-depense/add-depense.component';
import { DepenseService } from './depense.service';




@NgModule({
  declarations: [
    AddDepenseComponent,DepenseService
  ],
  imports: [
    CommonModule
  ]
})
export class GestionDepensesModule { }
