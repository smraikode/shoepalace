import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormSubmitService } from '../services_/form-submit.service';
import { InsertSellService } from '../services_/insert-sell.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  data: any = {};
  constructor(private sendData: FormSubmitService, private insertSellService: InsertSellService, private router: Router) { }

  ngOnInit() {
  }
  res: any;
  sellitems: any;
  formSubmit(form: NgForm) {
    this.sendData.postFormData(this.data).subscribe(res=>{
      this.res = res[0];
      this.sellitems = this.res;
      this.res = null;
      form.reset();
    },
    err => {
      alert('Please enter appropriate details');
    });
  }

  // selectProduct() {
  //   this.sellitems = this.res;
  //   this.sellitems.sellQuantity = 1;
  //   this.res = null;
  // }

  finalOrder: any = [];
  insertSell() {
    let gst = 0, sellprice = 0;
      sellprice = parseInt(this.sellitems.sellPrice);
      // sellprice = sellprice * parseInt(this.sellitems.sellQuantity);
      if(sellprice < 1000) {
        gst = 0.025;
      } else {
        gst = 0.09;
      }
      this.sellitems.sellQuantity = parseInt(this.sellitems.sellQuantity);
      gst = sellprice * gst;
      this.sellitems.cgst = gst * this.sellitems.sellQuantity;
      this.sellitems.sgst = gst  * this.sellitems.sellQuantity;
      this.sellitems.totalPrice = sellprice * this.sellitems.sellQuantity;
      console.log(this.sellitems.cgst);
      console.log(this.sellitems.sgst);
      console.log(this.sellitems.totalPrice);
      console.log(this.sellitems.sellPrice);
      this.sellitems.sellPrice = this.sellitems.totalPrice - (this.sellitems.cgst + this.sellitems.sgst);
      console.log(this.sellitems.sellPrice);
      this.finalOrder.push(this.sellitems);
      this.sellitems = null;
      console.log(this.finalOrder);
  }

  placeOrder() {
    this.insertSellService.postFormData(this.finalOrder).subscribe(res => {
      if(res) {
        this.finalOrder = [];
        this.router.navigate(['/receipt', res]);
      }
    },
    err => {
      console.log("error");
    });
    
  }
}
