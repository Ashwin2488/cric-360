import {Component, Input, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {DataHelperService} from '../../data-helper.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss'],
})
export class PlayerDetailComponent implements OnInit {
  @Input() playerData;
  dismissalChartData = [];
  latestScoresChartData = [];
  latestWicketsChartData = [];
  constructor(private modalController: ModalController, private dataHelperService: DataHelperService) { }

  ngOnInit() {
    this.getDismissalsData();
    this.getLatestScores();
    this.getLatestWickets();
  }
  getLatestScores() {
    const playerID = this.playerData.data.PlayerID;
    const allMatches = this.dataHelperService.allMatchesData.slice(0).reverse();
    const allScoreCard = this.dataHelperService.allScoreCard;
    let matchScoreAdded = 0;
    allMatches.some((match) => {
      allScoreCard.forEach((scoreCard) => {
        if (scoreCard.data.PlayerID === playerID && scoreCard.data.MatchID === match.matchId &&
          scoreCard.data.HowOut !== 'DNB') {
          this.latestScoresChartData.push({
            match: `vs ${match.opponentName}`,
            runs: scoreCard.data.Runs,
            strikeRate: scoreCard.data.strikeRate
          });
          matchScoreAdded++;
        }
      });
      return (matchScoreAdded === 5);
    });
  }
  getLatestWickets() {
    const playerID = this.playerData.data.PlayerID;
    const allMatches = this.dataHelperService.allMatchesData.slice(0).reverse();
    const allScoreCard = this.dataHelperService.allScoreCard;
    let matchWicketsAdded = 0;
    allMatches.some((match) => {
      allScoreCard.forEach((scoreCard) => {
        if (scoreCard.data.PlayerID === playerID && scoreCard.data.MatchID === match.matchId &&
          parseInt(scoreCard.data.OversBowled) > 0) {
          this.latestWicketsChartData.push({
            match: `vs ${match.opponentName}`,
            wickets: scoreCard.data.Wickets,
            economy: scoreCard.data.economy
          });
          matchWicketsAdded++;
        }
      });
      return (matchWicketsAdded === 5);
    });
  }
  getDismissalsData() {
    const playerID = this.playerData.data.PlayerID;
    const allScoreCardData = this.dataHelperService.allScoreCard;
    const dismissalsMap: any = {};
    allScoreCardData.forEach((scoreCard) => {
      if (scoreCard.data.PlayerID === playerID && scoreCard.data.HowOut !== 'DNB') {
        dismissalsMap[scoreCard.data.HowOut] = dismissalsMap[scoreCard.data.HowOut] === undefined ? 1 :
          dismissalsMap[scoreCard.data.HowOut] + 1;
      }
    });
    for (const dismissal in dismissalsMap) {
      this.dismissalChartData.push({
        dismissal,
        total: dismissalsMap[dismissal]
      });
    }
  }
  dismissModal() {
    this.modalController.dismiss();
  }

}
