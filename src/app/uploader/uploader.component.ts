import { Component, OnInit } from '@angular/core';
import { FileReaderService } from '../services/file-reader.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  isActive!: boolean;

  fileName: string = '';

  constructor(
    private fileReaderService: FileReaderService) {
  }

  ngOnInit(): void {
  }

  onDragOver(event: any) {
    this.isActive = true;
    event.preventDefault();
  }

  onDragLeave() {
    this.isActive = false;
  }

  onDrop(event: any) {
    event.preventDefault();
    const file: File = event.dataTransfer.files[0];
    this.fileReaderService.readFile(file);
    this.isActive = false;
  }

  onClick(event: any) {
    event.preventDefault();
    const file: File = event.target.files[0]
    this.fileReaderService.readFile(file);
    this.isActive = false;
  } 
}
