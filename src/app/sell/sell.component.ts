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
  formSubmit(form: NgForm) {
    this.sendData.postFormData(this.data).subscribe(res=>{
      this.res = res[0];
      form.reset();
    },
    err => {
      alert('Please enter appropriate details');
    });
  }
  sellitems: any;
  selectProduct() {
    this.sellitems = this.res;
    this.sellitems.sellQuantity = 1;
    this.res = null;
  }

  finalOrder: any = [];
  insertSell() {
    let gst = 0, sellprice = 0;
      sellprice = parseInt(this.sellitems.sellPrice);
      if(sellprice < 1000) {
        gst = 0.025;
      } else {
        gst = 0.09;
      }
      gst = sellprice * gst;
      this.sellitems.cgst = gst;
      this.sellitems.sgst = gst;
      this.sellitems.sellQuantity = parseInt(this.sellitems.sellQuantity);
      this.sellitems.totalPrice = sellprice;
      this.sellitems.sellPrice = sellprice - (this.sellitems.cgst + this.sellitems.sgst);
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
