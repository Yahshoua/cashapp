import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParieursPage } from './parieurs.page';

const routes: Routes = [
  {
    path: '',
    component: ParieursPage,
    children: [
      {
        path: 'nouveau',
        loadChildren: () => import('../nouveau/nouveau.module').then( m => m.NouveauPageModule)
      },
      {
        path: 'ancien',
        loadChildren: () => import('../ancien/ancien.module').then( m => m.AncienPageModule)
      },
      {
        path: 'professionnels',
        loadChildren: () => import('../professionnels/professionnels.module').then( m => m.ProfessionnelsPageModule)
    
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParieursPageRoutingModule {}
