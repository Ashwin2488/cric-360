import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchesPage } from './matches.page';
import {SharedModule} from '../shared/shared.module';
import { MatchesPageRoutingModule } from './matches-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    MatchesPageRoutingModule
  ],
  declarations: [MatchesPage]
})
export class MatchesPageModule {}
