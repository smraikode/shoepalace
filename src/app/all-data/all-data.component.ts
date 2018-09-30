import { Component, OnInit } from '@angular/core';
import { AllDataService } from '../services_/all-data.service';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-all-data',
  templateUrl: './all-data.component.html',
  styleUrls: ['./all-data.component.css'],
  providers: [AllDataService]
})
export class AllDataComponent implements OnInit {

  posts: any = [];
  constructor(private allData: AllDataService) { }

  ngOnInit() {
    this.allData.getAllData().subscribe(posts=>{
       this.posts = posts;
    });
  }

}
