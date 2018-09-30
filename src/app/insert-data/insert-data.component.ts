import { Component, OnInit } from '@angular/core';
import { FormSubmitService } from '../services_/form-submit.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-insert-data',
  templateUrl: './insert-data.component.html',
  styleUrls: ['./insert-data.component.css']
})
export class InsertDataComponent implements OnInit {

  data: any = {};
  successMsg: boolean = false;
  errorMsg: boolean = false;
  constructor(private sendData: FormSubmitService) { }

  ngOnInit() {
    
  }
  formSubmit(form: NgForm) {
    this.sendData.postFormData(this.data).subscribe(res=>{
      this.errorMsg = false;
      this.successMsg = true;
      form.resetForm();
    },
    err => {
      this.successMsg = false;
      this.errorMsg = true;
    });
  }
}
