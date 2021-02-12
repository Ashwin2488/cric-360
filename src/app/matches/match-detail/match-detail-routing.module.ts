import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatchDetailComponent} from './match-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MatchDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchDetailRoutingModule {}
