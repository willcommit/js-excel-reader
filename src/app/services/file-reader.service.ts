import { Injectable } from '@angular/core';
import { generateDate } from '../utils/date'
import { ExcelService } from '../services/excel.service';


@Injectable({
  providedIn: 'root'
})
export class FileReaderService {

  constructor(
    private excelService: ExcelService,
  ) { }

  readFile(file: any) {
    const fileReader = new FileReader();

    if (file) {
      fileReader.readAsBinaryString(file)
      fileReader.onload = (event: any) => {
        let binaryData = event.target.result;
        let jsonArray = this.excelService.readExceltoJson(binaryData);
        let cleanDataArray = this.excelService.cleanData(jsonArray);

        const dateString = generateDate()
        const fileName = 'FSA_upload_' + dateString

        this.excelService.exportToCsv(cleanDataArray, fileName)
        alert(`${fileName} is now in your Download folder!`)
      }
    }
  }
}
