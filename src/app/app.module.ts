import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
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
@NgModule({
  declarations: [AppComponent, MesparisPage,ParisdetailPage, ProfilPage, DescriptionPage, ParticipantsPage, InvitationsPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
