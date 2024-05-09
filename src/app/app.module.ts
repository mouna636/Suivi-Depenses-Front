import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { GestionDepensesModule } from './Components/gestion-depenses/gestion-depenses.module';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AdminSidebarComponent } from './Components/admin-sidebar/admin-sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    AdminSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,GestionDepensesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
