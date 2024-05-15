import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    depense.userId = this.local.getObject('user').id;
    console.log(depense);

    return this.http.post<Depense>(this.URI, { depense });
  }
  getAllDepensessByUserId() {
    return this.http.get<Depense[]>(
      `${this.URI}/user/${this.local.getObject('user').id}`
    );
  }
}
