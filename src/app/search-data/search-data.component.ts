import { Component, OnInit } from '@angular/core';
import { FormSubmitService } from '../services_/form-submit.service';

@Component({
  selector: 'app-search-data',
  templateUrl: './search-data.component.html',
  styleUrls: ['./search-data.component.css']
})
export class SearchDataComponent implements OnInit {
  data: any = {};
  constructor(private sendData: FormSubmitService) { }

  ngOnInit() {
  }
  res: any = [];
  formSubmit() {
    this.sendData.postFormData(this.data).subscribe(res=>{
      this.res = res;
    },
    err => {
      alert('Please enter proper creadiancials');
    });
  }
}
