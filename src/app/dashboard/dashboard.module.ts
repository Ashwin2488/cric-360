import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import {DataResolver} from '../data.resolver';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ],
  declarations: [DashboardPage],
  providers: [
    { provide: 'dataResolver', useClass: DataResolver}
  ]
})
export class DashboardModule {}
