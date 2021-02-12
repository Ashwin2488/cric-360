import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatsFullListComponent} from './stats-full-list.component';

const routes: Routes = [
  {
    path: '',
    component: StatsFullListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsFullListRoutingModule {}
