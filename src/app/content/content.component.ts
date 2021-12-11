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
  constructor(private _vps: ViewportScroller, private dataService: DataService) {}

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

}
