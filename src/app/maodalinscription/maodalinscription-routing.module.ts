import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaodalinscriptionPage } from './maodalinscription.page';

const routes: Routes = [
  {
    path: '',
    component: MaodalinscriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaodalinscriptionPageRoutingModule {}
