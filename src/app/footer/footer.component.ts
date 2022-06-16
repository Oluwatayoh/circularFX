import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { data } from 'jquery';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  fxData: any = [];

  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getPricesByCountry("all").subscribe((data) => {
      console.log("all data >>>>", data)
      let arr: any = [];
      data.data.forEach((e: any) => {
        let mValue: any;
        mValue = e;
        if (e.countryId != '' || e.countryId != null) {
          var mCountry = this.dataService.getCountries().filter(
            (c: any) => c.code.toLowerCase() === e.countryId.toLowerCase()
          );
          mValue.flag = mCountry[0].flag;
        }
        arr.push(mValue);
      });
      this.fxData = arr;
    });
  }

  getPercentageVal(d: String) {
    return;
  }
}
