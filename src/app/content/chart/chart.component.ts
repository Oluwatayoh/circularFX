import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartConfiguration,
  ChartEvent,
  ChartType,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { EChartsOption } from 'echarts';
import { BaseChartDirective } from 'ng2-charts';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  fxData: any = [];
  countries: any = [
    {
      name: 'Nigeria',
      code: 'NG',
      capital: 'Abuja',
      region: 'AF',
      currency: {
        code: 'NGN',
        name: 'Nigerian naira',
        symbol: '₦',
      },
      language: {
        code: 'en',
        name: 'English',
      },
      flag: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg',
    },
    {
      name: 'Ghana',
      code: 'GH',
      capital: 'Accra',
      region: 'AF',
      currency: {
        code: 'GHS',
        name: 'Ghanaian cedi',
        symbol: '₵',
      },
      language: {
        code: 'en',
        name: 'English',
      },
      flag: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg',
    },
    {
      name: 'Togo',
      code: 'TG',
      capital: 'Lomé',
      region: 'AF',
      currency: {
        code: 'XOF',
        name: 'West African CFA franc',
        symbol: 'Fr',
      },
      language: {
        code: 'fr',
        name: 'French',
      },
      flag: 'https://restcountries.eu/data/tgo.svg',
    },
    {
      name: 'Congo',
      code: 'CG',
      capital: 'Brazzaville',
      region: 'AF',
      currency: {
        code: 'XAF',
        name: 'Central African CFA franc',
        symbol: 'Fr',
      },
      language: {
        code: 'fr',
        name: 'French',
      },
      flag: 'https://restcountries.eu/data/cog.svg',
    },
    {
      name: 'Cameroon',
      code: 'CM',
      capital: 'Yaoundé',
      region: 'AF',
      currency: {
        code: 'XAF',
        name: 'Central African CFA franc',
        symbol: 'Fr',
      },
      language: {
        code: 'en',
        name: 'English',
      },
      flag: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Cameroon.svg',
    },
    {
      name: 'South Africa',
      code: 'ZA',
      capital: 'Pretoria',
      region: 'AF',
      currency: {
        code: 'ZAR',
        name: 'South African rand',
        symbol: 'R',
      },
      language: {
        code: 'en',
        iso639_2: 'eng',
        name: 'English',
        nativeName: 'English',
      },
      flag: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg',
    },
    {
      name: 'Kenya',
      code: 'KE',
      capital: 'Nairobi',
      region: 'AF',
      currency: {
        code: 'KES',
        name: 'Kenyan shilling',
        symbol: 'Sh',
      },
      language: {
        code: 'en',
        name: 'English',
      },
      flag: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg',
    },
    {
      name: 'Rwanda',
      code: 'RW',
      capital: 'Kigali',
      region: 'AF',
      currency: {
        code: 'RWF',
        name: 'Rwandan franc',
        symbol: 'Fr',
      },
      language: {
        code: 'rw',
        name: 'Kinyarwanda',
      },
      flag: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg',
    },
    {
      name: 'Tanzania',
      code: 'TZ',
      capital: 'Dodoma',
      region: 'AF',
      currency: {
        code: 'TZS',
        name: 'Tanzanian shilling',
        symbol: 'Sh',
      },
      language: {
        code: 'en',
        name: 'English',
      },
      flag: 'https://restcountries.eu/data/tza.svg',
    },
    {
      name: 'Egypt',
      code: 'EG',
      capital: 'Cairo',
      region: 'AF',
      currency: {
        code: 'EGP',
        name: 'Egyptian pound',
        symbol: '£',
      },
      language: {
        code: 'ar',
        name: 'Arabic',
      },
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg',
    },
    {
      name: 'Morocco',
      code: 'MA',
      capital: 'Rabat',
      region: 'AF',
      currency: {
        code: 'MAD',
        name: 'Moroccan dirham',
        symbol: 'د.م.',
      },
      language: {
        code: 'ar',
        name: 'Arabic',
      },
      flag: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg',
    },
  ];
  selectedCountry: any = {};
  selectedChart: number = 0;
  options: any;

  constructor(private dataService: DataService) {
    this.getCommodityData(this.selectedCountry.name);
  }

  ngOnInit(): void {
    this.selectedCountry = this.countries[0];
    this.getCommodityData(this.selectedCountry.name);
  }

  ngAfterViewInit() {}

  onChange(country: any) {
    this.selectedCountry = country;
    this.getCommodityData(this.selectedCountry.name);
    this.selectedChart = 0;
    // this.saveComodityData.country = this.selectedCountry.name;
  }

  onChangeChart(e: number) {
    console.log('>>>>>>', e);
    this.selectedChart = e;
    if (e == 0) {
      this.populateChart(this.fxData);
    }
    if (e == 1) {
      this.populateBarChart(this.fxData);
    }
  }

  getCommodityData(country: string) {
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
      this.fxData = arr;
      this.populateChart(this.fxData);
    });
  }

  populateChart(data: any) {
    let pieData: any = [];
    for (var i = 0; i < data.length; i++) {
      var obj: any = {};
      obj.value = data[i].price;
      obj.name = data[i].name;
      obj.label = data[i].price.toString();
      pieData.push(obj);
    }
    // console.log(pieData)
    this.options = {
      legend: {
        orient: 'vertical',
        left: -10,
        top: 'center',
        // top: 'bottom',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: false, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: true },
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)',
      },
      series: [
        {
          // name: 'Nightingale Chart',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: pieData,
        },
      ],
    };
  }

  populateBarChart(data: any) {
    let barData: any = [];
    let axisData: any = [];
    for (var i = 0; i < data.length; i++) {
      axisData.push(data[i].name);
      barData.push(data[i].price);
    }
    const links = barData.map((item: any, i: any) => {
      return {
        source: i,
        target: i + 1,
      };
    });
    links.pop();

    // console.log(barData)
    this.options = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: axisData,
      },
      yAxis: {
        type: 'value',
      },

      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}',
      },
      series: [
        {
          type: 'graph',
          layout: 'none',
          coordinateSystem: 'cartesian2d',
          symbolSize: 40,
          label: {
            show: false,
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          data: barData,
          links: links,
          lineStyle: {
            color: '#3ba272',
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: '#1b3664',
            shadowOffsetY: 5,
            color: {
              type: 'radial',
              x: 0.4,
              y: 0.3,
              r: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgb(60, 80, 114)',
                },
                {
                  offset: 1,
                  color: 'rgb(27,54,100)',
                },
              ],
            },
          },
        },
      ],
    };
  }
}
