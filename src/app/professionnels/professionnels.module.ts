import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessionnelsPageRoutingModule } from './professionnels-routing.module';

import { ProfessionnelsPage } from './professionnels.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessionnelsPageRoutingModule
  ],
  declarations: [ProfessionnelsPage]
})
export class ProfessionnelsPageModule {}
