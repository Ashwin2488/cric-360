import {Component, OnInit} from '@angular/core';
import {DataHelperService} from '../data-helper.service';
import {Router} from '@angular/router';
import { AppEventsService } from '../app-event-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'stats.page.html',
  styleUrls: ['stats.page.scss']
})
export class StatsPage implements OnInit {
  slideOpt = {
    slidesPerView: 'auto'
  };
  mostRunsList = [];
  highScoreList = [];
  battingAverageList = [];
  mostWicketsList = [];
  bestEconomyList = [];
  recentMatches = [];
  mostFoursList = [];
  mostSixesList = [];
  strikeRateList = [];
  lastWeekStats = {};
  constructor(private dataHelperService: DataHelperService, private router: Router, private appEventService: AppEventsService) {}
  ngOnInit() {
    this.mostRunsList = this.dataHelperService.mostRunsList;
    this.highScoreList = this.dataHelperService.highScoreList;
    this.battingAverageList = this.dataHelperService.battingAverageList;
    this.mostWicketsList = this.dataHelperService.highestWicketList;
    this.bestEconomyList = this.dataHelperService.bestEconomyList;
    this.mostFoursList = this.dataHelperService.highestFoursList;
    this.mostSixesList = this.dataHelperService.highestSixList;
    this.strikeRateList = this.dataHelperService.strikeRateList;
    this.subscribeRatingChange();
    // this.recentMatches = this.dataHelperService.allMatchesData.slice(0).reverse().slice(0, 4);
  }
  subscribeRatingChange() {
    this.appEventService.lastWeekStats$.subscribe(stats => {
      this.lastWeekStats =stats;
    });
  }
  onCardClick(context) {
    this.router.navigate([`/dashboard/stats/${context}`]);
  }
  gotoMatches() {
    this.router.navigate([`/dashboard/matches`]);
  }
}
