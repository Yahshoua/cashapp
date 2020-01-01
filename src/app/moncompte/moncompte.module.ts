import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoncomptePageRoutingModule } from './moncompte-routing.module';

import { MoncomptePage } from './moncompte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoncomptePageRoutingModule
  ],
  declarations: [MoncomptePage]
})
export class MoncomptePageModule {}
