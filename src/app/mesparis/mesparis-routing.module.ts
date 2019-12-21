import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesparisPage } from './mesparis.page';

const routes: Routes = [
  {
    path: '',
    component: MesparisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesparisPageRoutingModule {}
