import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParisdetailPageRoutingModule } from './parisdetail-routing.module';

import { ParisdetailPage } from './parisdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParisdetailPageRoutingModule
  ],
  declarations: [ParisdetailPage]
})
export class ParisdetailPageModule {}
