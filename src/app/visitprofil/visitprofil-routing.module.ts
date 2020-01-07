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
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then( m => m.ChatPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitprofilPageRoutingModule {}
