import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataHelperService} from '../../data-helper.service';
import {ModalController} from '@ionic/angular';
import {PlayerDetailComponent} from '../player-detail/player-detail.component';
import {RacingChartComponent} from '../../charts/racing-chart/racing-chart.component';

@Component({
  selector: 'app-stats-full-list',
  templateUrl: './stats-full-list.component.html',
  styleUrls: ['./stats-full-list.component.scss'],
})
export class StatsFullListComponent implements OnInit {
  activeTab = 0;
  tabsList = [];
  constructor(private activatedRoute: ActivatedRoute,
              public dataHelperService: DataHelperService,
              private modalController: ModalController) { }

  ngOnInit() {
    const context: any = this.activatedRoute.snapshot.paramMap.get('context');
    this.activeTab = context || 0;
    this.initTabs();
  }
  initTabs() {
    this.tabsList = [
      {
        label: 'Most Runs',
        playerListKey: 'mostRunsList',
        displayValueKey: 'Runs'
      },
      {
        label: 'Highest Score',
        playerListKey: 'highScoreList',
        displayValueKey: 'HighScore'
      },
      {
        label: 'Batting Average',
        playerListKey: 'battingAverageList',
        displayValueKey: 'AvgRuns'
      },
      {
        label: 'Most Wickets',
        playerListKey: 'highestWicketList',
        displayValueKey: 'Wickets'
      },
      {
        label: 'Best Economy',
        playerListKey: 'bestEconomyList',
        displayValueKey: 'economy'
      }
    ];
  }
  async presentModal(player) {
    const modal = await this.modalController.create({
      component: PlayerDetailComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        playerData: player
      }
    });
    return await modal.present();
  }
  async showCharts(tab) {
    const chartData = this.dataHelperService.getChartData();
    const modal = await this.modalController.create({
      component: RacingChartComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        chartData
      }
    });
    return await modal.present();
  }
}
