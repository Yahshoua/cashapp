import { ComponentsModule } from './../component/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParieursPageRoutingModule } from './parieurs-routing.module';

import { ParieursPage } from './parieurs.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ParieursPageRoutingModule
  ],
  declarations: [ParieursPage]
})
export class ParieursPageModule {}
