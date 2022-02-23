import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart-compare',
  templateUrl: './chart-compare.component.html',
  styleUrls: ['./chart-compare.component.scss'],
})
export class ChartCompareComponent implements OnInit {
  constructor(private dataService: DataService) {}

  selectedCountry1: any = {};
  selectedCommodity1: any = {};
  selectedCountry2: any = {};
  selectedCommodity2: any = {};
  countries: any;
  commodities1: any;
  commodities2: any;
  options: any;

  ngOnInit(): void {
    this.countries = this.dataService.getCountries();
    this.selectedCountry1 = this.countries[0];
    this.selectedCountry2 = this.countries[1];
    this.getCommodityData1(this.selectedCountry1.name);
    this.getCommodityData2(this.selectedCountry2.name);
  }

  onSelectCountry1(country: any) {
    this.getCommodityData1(country.name);
  }
  onSelectCommodity1(e: any) {
    this.selectedCommodity1 = e;
    this.populateChart(this.selectedCommodity1, this.selectedCommodity2);
  }
  onSelectCountry2(country: any) {
    this.getCommodityData1(country.name);
  }
  onSelectCommodity2(e: any) {
    this.selectedCommodity2 = e;
    this.populateChart(this.selectedCommodity1, this.selectedCommodity2);
  }

  getCommodityData1(country: string) {
    this.dataService.getData().subscribe((data) => {
      let countryData = data.data.filter((p: any) => p.country === country);

      let currentValue = countryData.sort(
        (a: any, b: any) => parseFloat(b.id) - parseFloat(a.id)
      );
      let arr: any = [];
      currentValue.forEach((e: any) => {
        let mValue: any;
        mValue = e;
        if (e.country != '' || e.country != null) {
          var mCountry = this.countries.filter(
            (c: any) => c.name.toLowerCase() === e.country.toLowerCase()
          );
          mValue.flag = mCountry[0].flag;
        }
        arr.push(mValue);
        if (mValue.subCommodity.length != 0) {
          for (var i = 0; i < mValue.subCommodity.length; i++) {
            let initValue: any;
            initValue = mValue.subCommodity[i];
            initValue.country = mValue.country;
            initValue.flag = mValue.flag;
            arr.push(initValue);
          }
        }
      });
      this.commodities1 = arr;
      this.selectedCommodity1 = this.commodities1[0];
      this.populateChart(this.selectedCommodity1, this.selectedCommodity2);
    });
  }

  getCommodityData2(country: string) {
    this.dataService.getData().subscribe((data) => {
      let countryData = data.data.filter((p: any) => p.country === country);

      let currentValue = countryData.sort(
        (a: any, b: any) => parseFloat(b.id) - parseFloat(a.id)
      );
      let arr: any = [];
      currentValue.forEach((e: any) => {
        let mValue: any;
        mValue = e;
        if (e.country != '' || e.country != null) {
          var mCountry = this.countries.filter(
            (c: any) => c.name.toLowerCase() === e.country.toLowerCase()
          );
          mValue.flag = mCountry[0].flag;
        }
        arr.push(mValue);
        if (mValue.subCommodity.length != 0) {
          for (var i = 0; i < mValue.subCommodity.length; i++) {
            let initValue: any;
            initValue = mValue.subCommodity[i];
            initValue.country = mValue.country;
            initValue.flag = mValue.flag;
            arr.push(initValue);
          }
        }
      });
      this.commodities2 = arr;
      this.selectedCommodity2 = this.commodities2[0];
      this.populateChart(this.selectedCommodity1, this.selectedCommodity2);
    });
  }

  populateChart(data: any, data2: any) {
    // let source1: any = ['product'];
    // let source2: any = [];
    // let source3: any = [];
    // source1.push(data.month);
    // source1.push(data2.month);

    // source2.push(data.country);
    // source2.push(data.price);
    // source2.push(data.price_month);

    // source3.push(data2.country);
    // source3.push(data2.price);
    // source3.push(data2.price_month);
    // source1.push(data2.month.toString());
    // console.log(source2)

    let category: any = [];
    let dottedBase = +new Date();
    let lineData: any = [];
    let barData: any = [];
    barData.push(data.price);
    barData.push(data2.price);
    lineData.push(data.price_month);
    lineData.push(data2.price_month);

    category.push(data.country);
    category.push(data2.country);


    this.options = {
      backgroundColor: '#1b3664',
      tooltip: {
        trigger: 'axis',

        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        data: ['line', 'bar'],
        textStyle: {
          color: '#ccc',
        },
      },
      xAxis: {
        data: category,
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
      },
      series: [
        {
          name: 'line',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: lineData,
        },
        {
          name: 'bar',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#14c8d4' },
              { offset: 1, color: '#43eec6' },
            ]),
          },
          data: barData,
        },
        {
          name: 'line',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(20,200,212,0.5)' },
              { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
              { offset: 1, color: 'rgba(20,200,212,0)' },
            ]),
          },
          z: -12,
          data: lineData,
        },
        {
          name: 'dotted',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            color: '#0f375f',
          },
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -10,
          data: lineData,
        },
      ],
    };
  }
}
