import { TabsComponent } from './../tabs/tabs.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilPage } from './accueil.page';
import { VosparisPage } from '../vosparis/vosparis.page';
import { TestComponent } from '../test/test.component';
const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilPage,
      children: [
        {
            path: 'allparis',
            loadChildren: () => import('../allparis/allparis.module').then( m => m.AllparisPageModule)
        },
        {
          path: 'vosparis',
          loadChildren: () => import('../vosparis/vosparis.module').then( m => m.VosparisPageModule)
        },
        {
          path: 'explorer',
          loadChildren: () => import('../explorer/explorer.module').then( m => m.ExplorerPageModule)
        }
    ]
  },
  {
    path: '',
    redirectTo: 'accueil/allparis'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccueilPageRoutingModule {}