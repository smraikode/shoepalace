import { Component, OnInit } from '@angular/core';
import { FormSubmitService } from '../services_/form-submit.service';
import { NgForm } from '@angular/forms';

export interface sizePair {
  size: string;
  quantity: string;
}

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
  cities: any = [];
  dropdownSettings: any = {};
  closeDropdownSelection=false;
  disabled=false;
  fieldArray: any = [];
  newAttribute: any = {};

  ngOnInit() {
    this.cities = [
      "   Gents",
      "G-Canvas Shoe",
      "G-Formal Shoe",
      "G-Sports Shoe",
      "G-Roman Sandal",
      "G-Leather sandal",
      "G-PU sandal",
      "G-Sports Sandal",
      "G-Leather Chappal",
      "G-PU Chappal",
      "G-PU Sleeper",
      "G-Sleeper",
      "   Ladies",
      "L-Canvas Shoe",
      "L-Fancy Shoe",
      "L-Sports Shoe",
      "L-PU Sandal",
      "L-Fancy Sandal",
      "L-Sports Sandal",
      "L-Fancy Chappal",
      "L-PU Chappal",
      "L-Sleeper",
      "   G-Kids",
      "Gk-Canvas Shoe",
      "Gk-Sports Shoe",
      "Gk-Leather Shoe",
      "Gk-Roman Sandal",
      "Gk-Leather sandal",
      "Gk-PU sandal",
      "Gk-Sports Sandal",
      "Gk-Leather Chappal",
      "Gk-PU Chappal",
      "Gk-PU Sleeper",
      "Gk-Sleeper",
      "   L-Kids",
      "Lk-PU Chappal",
      "Lk-PU sandal",
      "Lk-Fancy Chappal",
      "Lk-Fancy Shoe",
      "Lk-Fancy Sandal",
      "Lk-Canvas Shoe",
      "   Socks",
      "G-Socks",
      "G-Ankle Socks",
      "L-Ankle Socks",
      "L-Socks",
      "K-Socks",
      "K-School Socks",
    ];
    this.dropdownSettings = {
        singleSelection: true,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true,
        closeDropDownOnSelection: true
    };
  }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }

  sqdata: any = [];
    addFieldValue() {
        this.fieldArray.push(this.newAttribute);
        this.newAttribute = {};
    }

    deleteFieldValue(index) {
        this.fieldArray.splice(index, 1);
    }
  formSubmit(form: NgForm) {

    for(let i=0; i<this.fieldArray.length;i++) {
      this.data.size = this.fieldArray[i].size;
      this.data.quantity = this.fieldArray[i].quantity;
      console.log(this.data);
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
}
