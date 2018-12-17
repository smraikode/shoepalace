import { Component, OnInit } from '@angular/core';
import { DeleteRecordService } from '../services_/delete-record.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  data: any = {};
  constructor(private deleteRecord: DeleteRecordService) { }

  ngOnInit() {
  }

  res: any = [];
  showtable: boolean = false;
  formSubmit() {
    this.deleteRecord.postFormData(this.data).subscribe(res=>{
      this.res = res;
      this.showtable = true;
    },
    err => {
      alert('Please enter proper creadiancials');
    });
  }
}
