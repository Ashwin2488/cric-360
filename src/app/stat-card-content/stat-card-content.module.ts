import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StatCardContentComponent} from './stat-card-content.component';
import {IonicModule} from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [  IonicModule, CommonModule, SharedModule],
  declarations: [StatCardContentComponent],
  exports: [StatCardContentComponent]
})
export class StatCardContentComponentModule {}
