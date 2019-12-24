import { TabsComponent } from './../tabs/tabs.component';
import { TestComponent } from './../test/test.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { VosparisPage } from '../vosparis/vosparis.page';
@NgModule({
    declarations: [TabsComponent, TestComponent],
    imports: [IonicModule],
    exports: [TabsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ComponentsModule {}