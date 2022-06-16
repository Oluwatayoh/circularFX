import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-market-table',
  templateUrl: './market-table.component.html',
  styleUrls: ['./market-table.scss'],
  animations: [
    trigger('panelInOut', [
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(800),
      ]),
      transition('* => void', [
        animate(800, style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class MarketTableComponent implements OnInit {
  showSub: boolean = false;
  fxData: any = [];

  filter: string = '';
  config: any;
  selectedCountry: any = {};

  startDate: any;
  endDate: any;
  // isFilter: boolean = true;

  constructor(public dataService: DataService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
    };
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  onChange(country: any) {
    this.selectedCountry = country;
    this.getCommodityData();
    // this.isFilter = false;
  }

  getCommodityData() {
    this.dataService.getPrices().subscribe((data) => {
      let countryData = data.data.filter(
        (p: any) => p.countryId === this.selectedCountry.code
      );
      this.fxData = countryData.reverse();
    });
  }

  filterPrice() {
    var fl = {
      startDate: this.startDate,
      endDate: this.endDate,
    };
    this.dataService.filterPriceWithDate(fl).subscribe((data) => {
      let countryData = data.data.filter(
        (p: any) => p.countryId === this.selectedCountry.code
      );
      this.fxData = countryData.reverse();
    });
  }


  showClass(fx: any) {
    if (fx.subCommodity != 0) {
      this.showSub = !this.showSub;
    } else {
      this.showSub = false;
    }
  }

  ngOnInit(): void {

    this.selectedCountry = this.dataService.getCountries()[0];
    this.getCommodityData();
  }

  ngAfterViewInit() {
    // this returns null
  }
}
