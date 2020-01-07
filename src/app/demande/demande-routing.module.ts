import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandePage } from './demande.page';

const routes: Routes = [
  {
    path: '',
    component: DemandePage,
    children: [
      {
        path: 'fiche',
        loadChildren: () => import('../fiche/fiche.module').then( m => m.FichePageModule)
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandePageRoutingModule {}
