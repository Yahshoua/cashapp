import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AncienPageRoutingModule } from './ancien-routing.module';

import { AncienPage } from './ancien.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AncienPageRoutingModule
  ],
  declarations: [AncienPage]
})
export class AncienPageModule {}
