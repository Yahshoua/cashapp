import { TabsProfilComponent } from './../tabs-profil/tabs-profil.component';
import { TabsComponent } from './../tabs/tabs.component';
import { TestComponent } from './../test/test.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { CommonModule } from '@angular/common';
import { PopoveruserComponent } from './../popoveruser/popoveruser.component';
@NgModule({
    declarations: [TabsComponent, TestComponent, TabsProfilComponent, PopoveruserComponent],
    imports: [IonicModule, CommonModule],
    exports: [TabsComponent, TabsProfilComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ComponentsModule {}