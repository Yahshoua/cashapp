import { InvitationsPage } from './invitations/invitations.page';
import { ParticipantsPage } from './participants/participants.page';
import { DescriptionPage } from './description/description.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MesparisPage } from './mesparis/mesparis.page';
import { ProfilPage } from './profil/profil.page';
import { ParisdetailPage } from './parisdetail/parisdetail.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'accueil',
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
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
