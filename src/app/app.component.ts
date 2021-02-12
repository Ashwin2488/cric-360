import {Component, OnInit} from '@angular/core';
import {AppEventsService} from './app-event-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  appLoading = true;
  constructor(private appEventService: AppEventsService) {}
  ngOnInit() {
    this.appEventService.message$.subscribe(message => {
      if (message.appLoading !== undefined) {
        this.appLoading = message.appLoading;
      }
    });
  }
}
