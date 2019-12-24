import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VosparisPage } from './vosparis.page';

const routes: Routes = [
  {
    path: '',
    component: VosparisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VosparisPageRoutingModule {}
