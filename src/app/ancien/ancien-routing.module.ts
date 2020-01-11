import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AncienPage } from './ancien.page';

const routes: Routes = [
  {
    path: '',
    component: AncienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AncienPageRoutingModule {}
