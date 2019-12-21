import { TabsComponent } from './../tabs/tabs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilPage } from './accueil.page';
const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilPage,
      children: [
        {
            path: 'allparis',
            loadChildren: () => import('../allparis/allparis.module').then( m => m.AllparisPageModule)
        }
    ]
  },
  {
    path: '',
    redirectTo: 'accueil/allparis',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccueilPageRoutingModule {}
