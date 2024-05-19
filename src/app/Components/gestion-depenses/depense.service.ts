import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Depense } from 'src/app/models/Depense';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BASE_URL } from 'src/app/services/config';
@Injectable({
  providedIn: 'root',
})
export class DepenseService {
  URI = `${BASE_URL}/api/depenses`;

  constructor(private http: HttpClient, private local: LocalStorageService) {}
  addDepense(depense: Depense) {
    console.log(depense);
    this.local.getCurrentUser().subscribe((usr) => {
      depense.userId = usr.id;
    });
    return this.http.post<Depense>(this.URI, { depense });
  }
  getAllDepensessByUserId(): Observable<any> {
    return this.local.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.get(`${this.URI}/user/${user.id}`);
      })
    );
  }
  deleteDepense(id: string) {
    return this.http.delete<Depense>(`${this.URI}/${id}`);
  }
  //filtrer les dépenses par date
  filterDepensesByDateRange(
    startDate: string,
    endDate: string
  ): Observable<any> {
    return this.local.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.get(
          `${this.URI}/user/${user.id}/date/${startDate}/${endDate}`
        );
      })
    );
  }

  //trier les transactions par montant
  sortDepensesByAmount(sortBy: any): Observable<any> {
    return this.local.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.get(`${this.URI}/user/${user.id}/montant/${sortBy}`);
      })
    );
  }
}
