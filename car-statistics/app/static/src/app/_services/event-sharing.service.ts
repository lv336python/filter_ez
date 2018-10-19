import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class EventSharingService {
  private dataset_id = new BehaviorSubject<number>(null);
  cast_dataset_id = this.dataset_id.asObservable();

  constructor() {
  }

  provideDatasetId(new_dataset_id) {
    this.dataset_id.next(new_dataset_id);
  }

}
