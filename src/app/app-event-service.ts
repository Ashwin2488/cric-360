import {EventEmitter, Injectable, Output} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppEventsService {
  @Output() message$: EventEmitter<any> = new EventEmitter();
  lastWeekStats$ = new BehaviorSubject(null);
  sendMessage(message) {
    this.message$.emit(message);
  }
  setLastweekStats(stats) {
    this.lastWeekStats$.next(stats);
  }
}
