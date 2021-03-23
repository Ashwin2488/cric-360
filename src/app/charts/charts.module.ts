import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RacingChartComponent} from './racing-chart/racing-chart.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {PieChartComponent} from './pie-chart/pie-chart.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';


@NgModule({
  declarations: [RacingChartComponent, PieChartComponent, BarChartComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    RacingChartComponent,
    PieChartComponent,
    BarChartComponent
  ]
})
export class ChartsModule { }
