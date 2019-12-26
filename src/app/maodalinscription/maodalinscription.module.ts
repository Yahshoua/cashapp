import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaodalinscriptionPageRoutingModule } from './maodalinscription-routing.module';

import { MaodalinscriptionPage } from './maodalinscription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaodalinscriptionPageRoutingModule
  ],
  declarations: [MaodalinscriptionPage]
})
export class MaodalinscriptionPageModule {}
