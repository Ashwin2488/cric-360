import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppEventsService} from './app-event-service';
import {firebase} from '@firebase/app';
import {environment} from '../environments/environment';
import {NotificationsService} from './notifications.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  appLoading = true;
  constructor(private appEventService: AppEventsService,
              private notificationsService: NotificationsService,
              private platform: Platform) {}
   ngOnInit() {
    firebase.initializeApp(environment.firebase);
    this.notificationsService.init();
    this.appEventService.message$.subscribe(message => {
      if (message.appLoading !== undefined) {
        this.appLoading = message.appLoading;
      }
    });
  }

  ngAfterViewInit() {
    this.platform.ready().then(async () => {
      await this.notificationsService.requestPermission();
    });
  }
}
