import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalService} from '../../_services/modal.service';


@Component({
    selector: 'app-file-upload-selector',
    templateUrl: './file-upload-selector.component.html',
    styleUrls: ['./file-upload-selector.component.css']
})
export class FileUploadSelectorComponent implements OnInit {
    selectedFile: File = null;
    @Input() uploads: Array<File>;
    @Output() fileUploaded: EventEmitter<number> = new EventEmitter();

    constructor(
        private http: HttpClient,
        private modalService: ModalService,
    ) {
    }
    clearSelectedFiles() {
        this.selectedFile = null;
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files;
        console.log(this.selectedFile);

    }

    ngOnInit() {
    }

    openModal(id: string) {
        this.modalService.open(id);
    }
}