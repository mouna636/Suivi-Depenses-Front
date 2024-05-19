import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL, colorArray } from './config';
import { Tag } from '../models/Tag';
import { LocalStorageService } from './local-storage.service';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  URI = `${BASE_URL}/api/tags`;

  constructor(private http: HttpClient, private local: LocalStorageService) {}
  addTag(tag: Tag) {
    return this.local.getCurrentUser().pipe(
      switchMap((user) => {
        tag.userId = user.id;
        tag.color = colorArray[Math.floor(Math.random() * colorArray.length)];
        console.log(tag);
        return this.http.post<Tag>(this.URI, tag);
      })
    );
  }

  getAllTagsByUserId(): Observable<any> {
    return this.local.getCurrentUser().pipe(
      switchMap((user) => {
        return this.http.get<Tag[]>(`${this.URI}/user/${user.id}`);
      })
    );
  }

  getTagById(id: string) {
    return this.http.get<Tag>(`${this.URI}/${id}`);
  }

  updateTag(id: string, tag: Tag) {
    return this.http.put<Tag>(`${this.URI}/${id}`, tag);
  }

  deleteTag(id: string) {
    return this.http.delete<Tag>(`${this.URI}/${id}`);
  }
}
