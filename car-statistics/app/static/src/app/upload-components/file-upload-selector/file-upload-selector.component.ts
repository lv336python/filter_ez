import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalService} from '../../_services/modal.service';


@Component({
    selector: 'app-file-upload-selector',
    templateUrl: './file-upload-selector.component.html',
    styleUrls: ['./file-upload-selector.component.css']
})
export class FileUploadSelectorComponent implements OnInit {
    selectedFile: Array<File>;
    @Input() uploads: Array<File>;
    @Output() fileUploaded: EventEmitter<number> = new EventEmitter();

    constructor(
        private http: HttpClient,
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

    openModal(id: string) {
        this.modalService.open(id);
    }
}