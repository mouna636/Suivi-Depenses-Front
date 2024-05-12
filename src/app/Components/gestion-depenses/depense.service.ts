import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DepenseService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:4000/api/depenses';
  addDepense(depense: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, depense);
  }
}
