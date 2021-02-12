import {Component, OnInit} from '@angular/core';
import {DataHelperService} from '../data-helper.service';
import {Router} from '@angular/router';

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
  constructor(private dataHelperService: DataHelperService, private router: Router) {}
  ngOnInit() {
    this.mostRunsList = this.dataHelperService.mostRunsList;
    this.highScoreList = this.dataHelperService.highScoreList;
    this.battingAverageList = this.dataHelperService.battingAverageList;
    this.mostWicketsList = this.dataHelperService.highestWicketList;
    this.bestEconomyList = this.dataHelperService.bestEconomyList;
  }
  onCardClick(context) {
    this.router.navigate([`/dashboard/stats/${context}`]);
  }
}
