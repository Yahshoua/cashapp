import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './../component/component.module';
import { IonicModule } from '@ionic/angular';

import { AllparisPageRoutingModule } from './allparis-routing.module';

import { AllparisPage } from './allparis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AllparisPageRoutingModule
  ],
  declarations: [AllparisPage]
})
export class AllparisPageModule {}
