import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisiteprofilPageRoutingModule } from './visiteprofil-routing.module';

import { VisiteprofilPage } from './visiteprofil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisiteprofilPageRoutingModule
  ],
  declarations: [VisiteprofilPage]
})
export class VisiteprofilPageModule {}
