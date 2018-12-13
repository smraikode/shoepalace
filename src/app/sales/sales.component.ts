import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from '../services_/report-service.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor(private getReport: ReportServiceService) {
    
   }

  ngOnInit() {
  }
  date:any;
  data: any;
  res: any;
  formSubmit(date) {
    this.data = {
      'date': date
    }

    console.log(this.data);
    this.getReport.getData(this.data).subscribe(res=>{
      this.downloadCSV({ filename: "report-data.csv" }, res);
    },
    err => {
      alert('Please enter appropriate details');
    });
  }

  convertArrayOfObjectsToCSV(args) {  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
  }
  downloadCSV(args, stockData) {  
    var data, filename, link;
    var csv = this.convertArrayOfObjectsToCSV({
        data: stockData
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);
    console.log(data);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }
}
