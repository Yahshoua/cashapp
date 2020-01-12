import { InscriptionPageModule } from './inscription/inscription.module';
import { ModalsmsPageModule } from './modalsms/modalsms.module';
import { OpinionPageModule } from './opinion/opinion.module';
import { GuardhomeService } from './guardhome.service';
import { GuardService } from './guard.service';
import { MaodalinscriptionPageModule } from './maodalinscription/maodalinscription.module';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule, IonicRouteStrategy, PopoverController, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MesparisPage } from './mesparis/mesparis.page';
import { ProfilPage } from './profil/profil.page';
import { Router, Routes } from '@angular/router';
import { ParisdetailPage } from './parisdetail/parisdetail.page';
import { DescriptionPage } from './description/description.page';
import { ParticipantsPage } from './participants/participants.page';
import { InvitationsPage } from './invitations/invitations.page';
import { HttpClientModule } from '@angular/common/http';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { MenuController } from '@ionic/angular';
import { MypagePage } from './mypage/mypage.page';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
@NgModule({
  declarations: [AppComponent, MesparisPage,ParisdetailPage, ProfilPage, DescriptionPage, ParticipantsPage, InvitationsPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, MaodalinscriptionPageModule, OpinionPageModule, ModalsmsPageModule, InscriptionPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    Sim,
    GuardService,
    GuardhomeService,
    Contacts,
    SMS,
    MenuController,
    Push,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
