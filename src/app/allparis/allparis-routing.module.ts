import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllparisPage } from './allparis.page';

const routes: Routes = [
  {
    path: '',
    component: AllparisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllparisPageRoutingModule {}
