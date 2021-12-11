import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { WhatWeTradeComponent } from './content/what-we-trade/what-we-trade.component';
import { IconsModule } from './icons/icons.module';
import { FooterComponent } from './footer/footer.component';
import { DataService } from './service/data.service';
import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';


import {
  DetermineDayPipe,
  ElipsesPipe,
  MoneyFormat,
  MoneyFormatInNaira,
  NoDecimalMoneyFormatInNaira,
  PhoneNumberPipe,
  SearchPipe,
  SentenceCase,
  ThousandSuffixPipe,
} from './service/custom.pipes';
import { MarketTableComponent } from './content/market-table/market-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContentFooterComponent } from './content/content/content-footer/content-footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CommodityResolver } from './service/resolvers';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ContactUsComponent } from './content/contact-us/contact-us.component';
import { OurServicesComponent } from './content/our-services/our-services.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    WhatWeTradeComponent,
    FooterComponent,
    DetermineDayPipe,
    ElipsesPipe,
    MoneyFormat,
    MoneyFormatInNaira,
    NoDecimalMoneyFormatInNaira,
    PhoneNumberPipe,
    SentenceCase,
    ThousandSuffixPipe,
    SearchPipe,
    MarketTableComponent,
    ContentFooterComponent,
    LandingPageComponent,
    AdminPageComponent,
    ContactUsComponent,
    OurServicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgChartsModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [DataService, CommodityResolver, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
