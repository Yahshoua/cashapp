import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitprofilPage } from './visitprofil.page';

const routes: Routes = [
  {
    path: '',
    component: VisitprofilPage,
    children: [
      {
          path: 'demande',
          loadChildren: () => import('../demande/demande.module').then( m => m.DemandePageModule)
      },
      {
        path: 'visiteprofil',
        loadChildren: () => import('../visiteprofil/visiteprofil.module').then( m => m.VisiteprofilPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitprofilPageRoutingModule {}
