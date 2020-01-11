import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalsmsPage } from './modalsms.page';

const routes: Routes = [
  {
    path: '',
    component: ModalsmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalsmsPageRoutingModule {}
