import {Component, OnInit} from '@angular/core';
import {DataHelperService} from '../data-helper.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'matches.page.html',
  styleUrls: ['matches.page.scss']
})
export class MatchesPage implements OnInit {
  slideOpt = {
    slidesPerView: 'auto'
  };
  allMatchesData = [];
  constructor(private dataHelperService: DataHelperService, private router: Router) {}
  ngOnInit() {
    this.allMatchesData = this.dataHelperService.allMatchesData.slice(0).reverse();
  }
}
