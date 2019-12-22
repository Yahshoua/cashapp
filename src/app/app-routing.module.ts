import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MesparisPage } from './mesparis/mesparis.page';
import { ProfilPage } from './profil/profil.page';

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
    loadChildren: () => import('./parisdetail/parisdetail.module').then( m => m.ParisdetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
