import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesparisPageRoutingModule } from './mesparis-routing.module';

import { MesparisPage } from './mesparis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesparisPageRoutingModule
  ],
  declarations: [MesparisPage]
})
export class MesparisPageModule {}
