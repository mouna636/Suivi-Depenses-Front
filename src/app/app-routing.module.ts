import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AddDepenseComponent } from './Components/gestion-depenses/add-depense/add-depense.component';
import { CategoryListComponent } from './Components/category-list/category-list.component';
import { TagListComponent } from './Components/tag-list/tag-list.component';
import { AuthComponent } from './Components/auth/auth.component';
import { ListDepenseComponent } from './Components/gestion-depenses/list-depense/list-depense.component';
import { GraphiqueComponent } from './Components/graphique/graphique.component';
import { GraheDepenceDateComponent } from './Components/grahe-depence-date/grahe-depence-date.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-depense', component: AddDepenseComponent },
  { path: 'list-categories', component: CategoryListComponent },
  { path: 'list-tags', component: TagListComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'list-depense', component: ListDepenseComponent },
  { path: 'graphique', component:GraphiqueComponent },
  { path: 'graphe-date', component:GraheDepenceDateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
