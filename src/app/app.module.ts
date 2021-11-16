import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [DataService, CommodityResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
