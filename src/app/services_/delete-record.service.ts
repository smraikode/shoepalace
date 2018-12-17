import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DeleteRecordService {

  constructor(private http: HttpClient) { }

  postFormData(data: any) {
    return this.http.post('/delete/', data).pipe(map((res) => {
      return res;
    }));
  }
}
