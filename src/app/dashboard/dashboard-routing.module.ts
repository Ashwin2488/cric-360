import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children: [
      {
        path: 'stats',
        children: [
          { path: '', loadChildren: () => import('../stats/stats.module').then(m => m.StatsPageModule)},
          { path: ':context',
            loadChildren: () => import('../stats/stats-full-list/stats-full-list.module').then(m => m.StatsFullListModule)}
        ]
      },
      {
        path: 'matches',
        children: [
          {path: '', loadChildren: () => import('../matches/matches.module').then(m => m.MatchesPageModule)},
          {path: ':matchId', loadChildren: () => import('../matches/match-detail/match-detail.module').then(m => m.MatchDetailModule)}
        ]
      },
      {
        path: 'gallery',
        loadChildren: () => import('../gallery/gallery.module').then(m => m.GalleryPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard/stats',
        pathMatch: 'full'
      }
    ],
    resolve: {
      dataResolver: 'dataResolver'
    }
  },
  {
    path: '',
    redirectTo: '/dashboard/stats',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DashboardRoutingModule {}
