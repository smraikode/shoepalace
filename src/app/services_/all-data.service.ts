import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AllDataService {

  constructor(private http: HttpClient) { }

  getAllData() {
    return this.http.get('/users/').pipe(map((posts) => {
      return posts;
    }));
  }
}
