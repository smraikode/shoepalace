import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecieptDataService {

  constructor(private http:HttpClient) { }

  getData(data:any) {
    return this.http.post('/getReceipt/', data).pipe(map((res) => {
      return res;
    }))
  }

}
