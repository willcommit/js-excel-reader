import { Binary } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  readExceltoJson(binaryData: Binary) {

    let workbok = XLSX.read(binaryData, { type: 'binary', raw: true });

    let sheetName = workbok.SheetNames[0]

    let ws = workbok.Sheets[sheetName]

    let jsonArray = XLSX.utils.sheet_to_json(ws, { range: 2 })

    return jsonArray;
  }

  cleanData(jsonArray: any) {

    let cleanDataArray: any[][] = [];

    jsonArray.forEach((element: any) => {
      if (element["Item no Lenght , MUST BE 11)"] === 11) {
        let array = [element["ProductCode"], element["Quantity"]]
        cleanDataArray.push(array)
      }
    });

    return cleanDataArray;
  }

  exportToCsv(dataArray: any, fileName: string) {

    let csv = 'ProductCode,Quantity,EIT2030(Offer Qty.),Offer Price,Currency,REMARKS\n';
    dataArray.forEach((row: any) => {
      csv += row.join(',,,,');
      csv += "\n";
    });

    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = `${fileName}.csv`;
    hiddenElement.click();
  }
}
