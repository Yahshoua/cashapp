import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveauPageRoutingModule } from './nouveau-routing.module';

import { NouveauPage } from './nouveau.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouveauPageRoutingModule
  ],
  declarations: [NouveauPage]
})
export class NouveauPageModule {}
