import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-match-summary-card',
  templateUrl: './match-summary-card.component.html',
  styleUrls: ['./match-summary-card.component.scss'],
})
export class MatchSummaryCardComponent implements OnInit {
  @Input() matchData;
  constructor(private router: Router) { }

  ngOnInit() {}
  onCardClick(matchData) {
    this.router.navigate([`/dashboard/matches/${matchData.matchId}`]);
    return;
  }

}
