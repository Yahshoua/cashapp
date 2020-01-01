import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoncomptePage } from './moncompte.page';

const routes: Routes = [
  {
    path: '',
    component: MoncomptePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoncomptePageRoutingModule {}
