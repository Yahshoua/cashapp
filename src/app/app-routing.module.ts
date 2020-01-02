import { MypagePage } from './mypage/mypage.page';
import { InvitationsPage } from './invitations/invitations.page';
import { ParticipantsPage } from './participants/participants.page';
import { DescriptionPage } from './description/description.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MesparisPage } from './mesparis/mesparis.page';
import { ProfilPage } from './profil/profil.page';
import { ParisdetailPage } from './parisdetail/parisdetail.page';
import { GuardService } from './guard.service';
import { GuardhomeService } from './guardhome.service';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',canActivate: [GuardhomeService], loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'accueil',
    canActivate: [GuardService],
    loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  {
    path: 'allparis',
    loadChildren: () => import('./allparis/allparis.module').then( m => m.AllparisPageModule)
  },
  {
    path: 'profil',
    component: ProfilPage,
      children: [
        {
            path: 'mesparis',
            component: MesparisPage,
            outlet:"myoutlet"
        }
    ]
  },
  {
    path: 'parisdetail/:id',
    component: ParisdetailPage,
    children: [
      {
        path: 'description',
       component: DescriptionPage,
       outlet: 'outlet2'
      },
      {
        path: 'participants',
       component: ParticipantsPage,
       outlet: 'outlet2'
      },
      {
        path: 'invitations',
       component: InvitationsPage,
       outlet: 'outlet2'
      }
    ]
  },
  {
    path: 'creation',
    loadChildren: () => import('./creation/creation.module').then( m => m.CreationPageModule)
  },
  {
    path: 'maodalinscription',
    loadChildren: () => import('./maodalinscription/maodalinscription.module').then( m => m.MaodalinscriptionPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'opinion',
    loadChildren: () => import('./opinion/opinion.module').then( m => m.OpinionPageModule)
  },
  {
    path: 'mypage',
    loadChildren: () => import('./mypage/mypage.module').then( m => m.MypagePageModule)
  },
  {
    path: 'editer',
    loadChildren: () => import('./editer/editer.module').then( m => m.EditerPageModule)
  },
  {
    path: 'conditions',
    loadChildren: () => import('./conditions/conditions.module').then( m => m.ConditionsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
