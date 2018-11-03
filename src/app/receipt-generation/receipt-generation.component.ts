import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-receipt-generation',
  templateUrl: './receipt-generation.component.html',
  styleUrls: ['./receipt-generation.component.css']
})
export class ReceiptGenerationComponent implements OnInit {

  constructor(private router: Router) { }
  res: any = {};
  ngOnInit() {
  }

  formSubmit() {
    this.router.navigate(['/receipt', this.res]);
  }

}
