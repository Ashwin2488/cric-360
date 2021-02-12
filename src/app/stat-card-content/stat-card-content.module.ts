import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StatCardContentComponent} from './stat-card-content.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  imports: [  IonicModule, CommonModule],
  declarations: [StatCardContentComponent],
  exports: [StatCardContentComponent]
})
export class StatCardContentComponentModule {}
