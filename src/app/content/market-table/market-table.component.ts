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

  filter: string = '';
  config: any;
  selectedCountry: any = {};

  constructor(private dataService: DataService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
    };
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  onChange(country: any) {
    // console.log(deviceValue);
    this.selectedCountry = country;
    this.getCommodityData(this.selectedCountry.name);
    // this.saveComodityData.country = this.selectedCountry.name;
  }

  getCommodityData(country: string) {
    this.dataService.getData().subscribe((data) => {
      let countryData = data.data.filter((p: any) => p.country === country);
      this.fxData = countryData.sort(
        (a: any, b: any) => parseFloat(b.id) - parseFloat(a.id)
      );
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
    // this.dataService.getData().subscribe((data) => {
    //   this.fxData =
    //     data.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id));
    // });
    this.selectedCountry = this.countries[0];
    this.getCommodityData(this.selectedCountry.name);
  }

  ngAfterViewInit() {
    // this returns null
  }
}
