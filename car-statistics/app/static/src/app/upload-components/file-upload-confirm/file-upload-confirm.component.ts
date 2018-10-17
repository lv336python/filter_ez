import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../_services/modal.service';
import {HttpClient} from '@angular/common/http';
import {FileUploadService} from '../../_services/file-upload.service';

@Component({
  selector: 'app-upload-confirm',
  templateUrl: './file-upload-confirm.component.html',
  styleUrls: ['./file-upload-confirm.component.css']
})
export class FileUploadConfirmComponent implements OnInit {
    @Input() uploadFiles: File[];
    @Output() onUploadFiles: EventEmitter<Array<File>> = new EventEmitter<Array<File>>();
    selected: Array<File>;

    constructor(private modalService: ModalService,
                private http: HttpClient,
                private uploadService: FileUploadService) {
    }

    ngOnInit() {
        this.selected = Array.from(this.uploadFiles);
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    removeItemFromUpload(file) {
        this.uploadService.onRemove(this.selected, file);
    }

    onUpload() {
    this.onUploadFiles.emit(this.selected);
    console.log(this.selected);
  }
}