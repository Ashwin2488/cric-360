import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'standing-change-indicator',
  templateUrl: './standing-change-indicator.component.html',
  styleUrls: ['./standing-change-indicator.component.scss'],
})
export class StandingChangeIndicatorComponent implements OnInit {
  @Input() lastWeekStats;
  @Input() displayProperty;
  @Input() playerID;
  @Input() currentStanding;
  Math = Math;
  constructor() { }

  ngOnInit() {
  }

}
