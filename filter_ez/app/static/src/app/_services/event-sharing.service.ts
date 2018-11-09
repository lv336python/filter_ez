import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EventSharingService {
  private dataset_id = new BehaviorSubject<object>(null);
  cast_dataset_id = this.dataset_id.asObservable();

  constructor() {
  }

  provideDatasetId(data: object) {
    this.dataset_id.next(data);
  }

}
