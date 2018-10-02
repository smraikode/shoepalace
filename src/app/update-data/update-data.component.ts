import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormSubmitService } from '../services_/form-submit.service'
import { FormUpdateService } from '../services_/form-update.service'

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {
  data: any = {};
  successMsg: boolean = false;
  errorMsg: boolean = false;
  formShown: boolean = false;
  constructor(private sendData: FormSubmitService, private updateData: FormUpdateService) { }

  ngOnInit() {
  }
  res: any = {};
  formSubmit(form: NgForm) {
    this.sendData.postFormData(this.data).subscribe(res=>{
      this.successMsg = false;
      this.formShown = true;
      this.res = res[0];
      console.log(this.res);
      form.reset();
    },
    err => {
      alert("Please Enter Valide Details");
    });
  }

  formUpdate(form1: NgForm) {
    this.updateData.postFormData(this.res).subscribe(res=>{
      this.errorMsg = false;
      this.successMsg = true;
      form1.reset();
      this.formShown = false;
    },
    err => {
      this.successMsg = false;
      this.errorMsg = true;
    });
  }
}
