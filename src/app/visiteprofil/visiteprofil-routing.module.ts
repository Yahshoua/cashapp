import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisiteprofilPage } from './visiteprofil.page';

const routes: Routes = [
  {
    path: '',
    component: VisiteprofilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisiteprofilPageRoutingModule {}
