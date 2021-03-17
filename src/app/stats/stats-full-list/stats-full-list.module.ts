import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {StatCardContentComponentModule} from '../../stat-card-content/stat-card-content.module';
import {StatsFullListComponent} from './stats-full-list.component';
import {StatsFullListRoutingModule} from './stats-full-list-routing.module';
import {PlayerDetailComponent} from '../player-detail/player-detail.component';
import {SuperTabsModule} from '@ionic-super-tabs/angular';
import {ChartsModule} from '../../charts/charts.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StatCardContentComponentModule,
    StatsFullListRoutingModule,
    SuperTabsModule,
    ChartsModule,
    SharedModule
  ],
  declarations: [StatsFullListComponent, PlayerDetailComponent]
})
export class StatsFullListModule {}
