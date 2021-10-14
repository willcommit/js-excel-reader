import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { generateDate } from '../utils/date'

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  active!: boolean;

  fileName: string = '';

  constructor(private excelService: ExcelService) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

    this.active = true;
    const file: File = event.target.files[0];
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
      }

    }
  }

}
