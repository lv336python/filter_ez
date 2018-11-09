import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../_services/modal.service';


@Component({
    selector: 'app-file-upload-selector',
    templateUrl: './file-upload-selector.component.html',
    styleUrls: ['./file-upload-selector.component.css']
})
export class FileUploadSelectorComponent implements OnInit {
    selectedFile: Array<File>;
    filesToUpload: Array<File>;

    constructor(
        private modalService: ModalService,
    ) {
    }

    onFileSelected(files, event) {
        if (files.value != null) {
            this.selectedFile = Array.from(event.target.files);
            console.log(this.selectedFile);
            files.value = null;
        }
    }

    ngOnInit() {
    }

    onUploaded($event) {
        this.filesToUpload.splice(this.filesToUpload.indexOf($event), 1);
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    onUploadFiles($event) {
        this.filesToUpload = $event;
    }
}