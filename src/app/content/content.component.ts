import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  constructor(
    private _vps: ViewportScroller,
    private dataService: DataService
  ) {}

  defaultOverview: boolean = true;
  compare: boolean = false;

  carouselOptions = {
    // margin: 25,
    loop: false,
    autoplay: true,
    center: true,
    dots: false,
    navSpeed: 500,
    // mouseDrag: true,
    autoWidth: false,
    autoHeight: false,
    touchDrag: true,
    pullDrag: false,
    nav: false,
    navText: ['', ''],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  ngOnInit(): void {
    AOS.init();
  }

  fxData: any = [];
  scrollFn(anchor: string): void {
    this._vps.scrollToAnchor(anchor);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  changeState(e: any) {
    console.log(e.target.value);
    if (e === 'overView') {
      this.defaultOverview = true;
      this.compare = false;
    } else if (e === 'compare') {
      this.defaultOverview = false;
      this.compare = true;
    }
  }
}
