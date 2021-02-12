import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {forkJoin, Observable, Subject} from 'rxjs';
import {first} from 'rxjs/operators';
import {DataService} from './data.service';
import {DataHelperService} from './data-helper.service';
import {AppEventsService} from './app-event-service';

@Injectable()
export class DataResolver implements Resolve<boolean> {
  private subject = new Subject<any>();
  constructor(private dataService: DataService, private dataHelperService: DataHelperService,
              private appEventService: AppEventsService) {}

  resolve(): Observable<boolean> {
    const $playerData = this.dataService.getPlayerData();
    const $matchData = this.dataService.getMatchData();
    const $scorecardData = this.dataService.getScorecardData();

    forkJoin([$playerData, $matchData, $scorecardData]).subscribe(([playerData, matchData, scorecardData]) => {
      this.dataHelperService.setAppData({
        playerData,
        matchData,
        scorecardData
      });
      this.appEventService.message$.emit({appLoading: false});
      this.subject.next();
    });
    return this.subject.asObservable().pipe(first());
  }
}
