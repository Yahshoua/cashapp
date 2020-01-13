import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypagePage } from './mypage.page';

const routes: Routes = [
  {
    path: 'profil',
    component: MypagePage,
    children: [{
      path: 'compte',
      loadChildren: () => import('../moncompte/moncompte.module').then( m => m.MoncomptePageModule)
    },
    {
        path: 'premium',
        loadChildren: () => import('../premium/premium.module').then( m => m.PremiumPageModule)
    },
    {
      path: 'parametre',
      loadChildren: () => import('../parametre/parametre.module').then( m => m.ParametrePageModule)
    }
  ]
  },
  {
    path: '',
    redirectTo: 'profil/compte',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypagePageRoutingModule {}
