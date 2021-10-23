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
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContentFooterComponent } from './content/content/content-footer/content-footer.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
