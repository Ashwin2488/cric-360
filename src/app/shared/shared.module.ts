import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchSummaryCardComponent } from './components/match-summary-card/match-summary-card.component';
import {BackButtonComponent} from './components/back-button/back-button.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  declarations: [MatchSummaryCardComponent, BackButtonComponent],
  exports: [
    MatchSummaryCardComponent,
    BackButtonComponent
  ]
})
export class SharedModule {}
