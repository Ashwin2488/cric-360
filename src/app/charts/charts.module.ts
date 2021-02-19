import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RacingChartComponent} from './racing-chart/racing-chart.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [RacingChartComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    RacingChartComponent
  ]
})
export class ChartsModule { }
