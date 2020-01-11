import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouveauPage } from './nouveau.page';

const routes: Routes = [
  {
    path: '',
    component: NouveauPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouveauPageRoutingModule {}
