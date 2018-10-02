import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FormUpdateService {
  constructor(private http: HttpClient) { }

  postFormData(data: any) {
    return this.http.post('/update/', data).pipe(map((res) => {
      return res;
    }));
  }
}
