import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessionnelsPage } from './professionnels.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessionnelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessionnelsPageRoutingModule {}
