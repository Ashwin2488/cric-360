import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataHelperService} from '../../data-helper.service';

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss'],
})
export class MatchDetailComponent implements OnInit {
  matchDetails;
  matchSummary;
  constructor(private activatedRoute: ActivatedRoute,
              public dataHelperService: DataHelperService) { }

  ngOnInit() {
    const matchId = this.activatedRoute.snapshot.paramMap.get('matchId');
    this.initMatchData(matchId);
  }
  initMatchData(matchId) {
    this.dataHelperService.allMatchesData.some((match) => {
      if (match.matchId === matchId) {
        this.matchSummary = match;
      }
    });
    this.matchDetails = this.dataHelperService.scoreCardDataMap[matchId];
    this.matchDetails = this.matchDetails.sort(this.sortBattingOrder('BattedOrder'));
  }
  sortBattingOrder(property) {
    return (a, b) => {
      if (!a[property]) {
        a[property] = 0;
      }
      if (!b[property]) {
        b[property] = 0;
      }
      return a[property] - b[property];
    };
  }
}
