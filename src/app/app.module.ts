import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';
// import { QRCodeModule } from 'angular2-qrcode';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './Admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AdminportalComponent } from './layouts/adminportal/adminportal.component';
import { HotelportalComponent } from './layouts/hotelportal/hotelportal.component';
import { LoginlayoutComponent } from './layouts/loginlayout/loginlayout.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { ForgetPasswordComponent } from './login/forget-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { SignInComponent } from './login/sign-in.component';
import { MaterialModule } from './shared/material.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    LeftMenuComponent,
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    HotelportalComponent,
    AdminportalComponent,
    SignInComponent,
    ForgetPasswordComponent,
    LoginlayoutComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    AdminModule,
    NgChartsModule
    // QRCodeModule,
    // ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
