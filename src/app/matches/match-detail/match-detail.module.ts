import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {SuperTabsModule} from '@ionic-super-tabs/angular';
import {MatchDetailComponent} from './match-detail.component';
import {MatchDetailRoutingModule} from './match-detail-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    MatchDetailRoutingModule,
    SuperTabsModule
  ],
  declarations: [MatchDetailComponent]
})
export class MatchDetailModule {}
