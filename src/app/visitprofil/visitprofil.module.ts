
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './../component/component.module';
import { IonicModule } from '@ionic/angular';
import { VisitprofilPageRoutingModule } from './visitprofil-routing.module';

import { VisitprofilPage } from './visitprofil.page';
import { PopoveruserComponent } from '../popoveruser/popoveruser.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    VisitprofilPageRoutingModule
  ],
  entryComponents: [PopoveruserComponent],
  declarations: [VisitprofilPage]
})
export class VisitprofilPageModule {}
