import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stat-card-content',
  templateUrl: './stat-card-content.component.html',
  styleUrls: ['./stat-card-content.component.scss'],
})
export class StatCardContentComponent implements OnInit {
  @Input() playerData = [];
  @Input() title;
  @Input() displayProperty;
  @Input() defaultImage;
  constructor() { }

  ngOnInit() {}

}
