import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FormSubmitService {

  data: any = {};
  constructor(private http: HttpClient) { }

  postFormData(data: any) {
    console.log(data);
    return this.http.post('/checkAndInsert/', data).pipe(map((res) => {
      return res;
    }));
  }
}
