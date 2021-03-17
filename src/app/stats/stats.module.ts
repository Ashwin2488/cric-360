import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsPage } from './stats.page';
import {StatCardContentComponentModule} from '../stat-card-content/stat-card-content.module';
import { StatsPageRoutingModule } from './stats-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StatCardContentComponentModule,
    StatsPageRoutingModule,
    SharedModule
  ],
  declarations: [StatsPage]
})
export class StatsPageModule {}
