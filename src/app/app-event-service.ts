import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppEventsService {
  @Output() message$: EventEmitter<any> = new EventEmitter();

  sendMessage(message) {
    this.message$.emit(message);
  }
}
