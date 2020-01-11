import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalsmsPageRoutingModule } from './modalsms-routing.module';

import { ModalsmsPage } from './modalsms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalsmsPageRoutingModule
  ],
  declarations: [ModalsmsPage]
})
export class ModalsmsPageModule {}
