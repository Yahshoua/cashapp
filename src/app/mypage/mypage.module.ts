import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './../component/component.module';
import { IonicModule } from '@ionic/angular';

import { MypagePageRoutingModule } from './mypage-routing.module';

import { MypagePage } from './mypage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MypagePageRoutingModule
  ],
  declarations: [MypagePage]
})
export class MypagePageModule {}
