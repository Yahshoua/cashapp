import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParisdetailPage } from './parisdetail.page';

const routes: Routes = [
  {
    path: '',
    component: ParisdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParisdetailPageRoutingModule {}
