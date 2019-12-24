import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VosparisPageRoutingModule } from './vosparis-routing.module';

import { VosparisPage } from './vosparis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VosparisPageRoutingModule
  ],
  declarations: [VosparisPage]
})
export class VosparisPageModule {}
