import { NgModule, ViewEncapsulation } from '@angular/core';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ChartComponent } from './content/market-table/chart/chart.component';
import { TradeComponent } from './trade/trade.component';
import { HttpConfigInterceptor } from './service/interceptor';
import { CarouselModule } from 'ngx-owl-carousel-o';


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
    ChartComponent,
    TradeComponent,
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
    CarouselModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [DataService, CommodityResolver, { provide: LocationStrategy, useClass: PathLocationStrategy }, 
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule { }
