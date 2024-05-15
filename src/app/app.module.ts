import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';

import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AdminSidebarComponent } from './Components/admin-sidebar/admin-sidebar.component';
import { AddDepenseComponent } from './Components/gestion-depenses/add-depense/add-depense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryListComponent } from './Components/category-list/category-list.component';
import { TagListComponent } from './Components/tag-list/tag-list.component';
import { AuthComponent } from './Components/auth/auth.component';
import { ListDepenseComponent } from './Components/gestion-depenses/list-depense/list-depense.component';

import { FooterComponent } from './Components/footer/footer.component';
import { HeroComponent } from './Components/hero/hero.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { TopBarComponent } from './Components/top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    AdminSidebarComponent,
    AddDepenseComponent,
    CategoryListComponent,
    TagListComponent,
    AuthComponent, ListDepenseComponent
    ,
    NavbarComponent,
    HeroComponent,
    FooterComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
