import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecieptDataService } from '../services_/reciept-data.service'


@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.css']
})
export class RecieptComponent implements OnInit {

  constructor(private route: ActivatedRoute, private receiptData: RecieptDataService) { }
  billNo: any;
  receipt: any = [];
  totals: any = {
    totalPrice: 0,
    totalSellPrice: 0,
    totalcgst: 0,
    totalsgst: 0
  };
  now: Date = new Date();
  ngOnInit() {

    document.querySelector(".header").classList.add("hide");
    document.querySelector(".left-panel").classList.add("hide");
    this.billNo = {
      billNo: this.route.snapshot.paramMap.get('billNo')
    };
    this.receiptData.getData(this.billNo).subscribe(res => {
      this.receipt = res;
      console.log(this.receipt);
      if(this.receipt.length > 0) {
        for(let i = 0, len = this.receipt.length; i < len; i++) {
          console.log(this.receipt[i].totalSellPrice);
          this.totals.totalPrice += this.receipt[i].totalSellPrice ;
          this.totals.totalSellPrice += this.receipt[i].sellPrice;
          this.totals.totalcgst += this.receipt[i].cgst;
          this.totals.totalsgst += this.receipt[i].sgst ;
          console.log("went");
        }
      console.log(this.totals);
      }
    },
    err => {
      console.log("reciept data is not recieved");
    })
  }

}
