import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../_services/modal.service';
import {FileUploadService} from '../../_services/file-upload.service';

@Component({
  selector: 'app-upload-confirm',
  templateUrl: './file-upload-confirm.component.html',
  styleUrls: ['./file-upload-confirm.component.css']
})
export class FileUploadConfirmComponent implements OnInit {
    @Input() uploadFiles: File[];
    @Output() onUploadFiles: EventEmitter<Array<File>> = new EventEmitter<Array<File>>();

    constructor(private modalService: ModalService,
                private uploadService: FileUploadService) {
    }

    ngOnInit() {
    }

    closeModal(id: string) {
        this.modalService.close(id);

    }

    removeItemFromUpload(file) {
        if (this.uploadFiles.length > 1) {
            this.uploadService.onRemove(this.uploadFiles, file);
        }
        else {
            this.closeModal('custom-modal-1')
        }
    }

    onUpload() {
        this.onUploadFiles.emit(this.uploadFiles);
  }
}