import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import SwiperCore, { EffectCards, Parallax, Pagination } from "swiper";

SwiperCore.use([EffectCards, Parallax, Pagination]);

@Component({
  selector: 'app-what-we-trade',
  templateUrl: './what-we-trade.component.html',
  styleUrls: ['./what-we-trade.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WhatWeTradeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  
}
