import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() {
  }

  onRemove(selected, file) {
    selected.splice(selected.indexOf(file), 1);
  }
}
