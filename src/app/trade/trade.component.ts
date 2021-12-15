import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
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
export class TradeComponent implements OnInit {
  commodities: any = [];
  isToSell: boolean = false;
  isToBuy: boolean = false;
  showTrade: boolean = false;
  filteredCommodities: any = [];
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
  selectedCommodity: any = {};
  buyData: any = {};
  sellData: any = {};
  images: any = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let com = this.route.snapshot.data['commodities'].data;
    let arr: any = [];
    com.forEach((e: any) => {
      arr.push(e);
      if (e.subCommodity.length != 0) {
        for (var i = 0; i < e.subCommodity.length; i++) {
          let initValue: any;
          initValue = e.subCommodity[i];
          initValue.country = e.country;
          arr.push(initValue);
        }
      }
    });
    this.commodities = arr;
    this.selectedCountry = this.countries[0];
    this.getCommodityData(this.selectedCountry.name);
    this.buyData.quantity = 1;
    this.buyData.total = this.buyData.quantity * this.selectedCommodity.price;
  }

  onShowTrade(id: number) {
    this.showTrade = !this.showTrade;
    if (id == 1) {
      this.isToBuy = true;
    } else if (id == 2) {
      this.isToSell = true;
    } else {
      this.showTrade = false;
      this.isToSell = false;
      this.isToBuy = false;
    }
  }

  onChange(country: string) {
    this.selectedCountry = country;
    this.getCommodityData(this.selectedCountry.name);
  }
  onQuantityChange(q: any) {
    this.buyData.total = q * this.selectedCommodity.price;
  }

  onChangeCommodity(cm: any) {
    this.selectedCommodity = cm;
  }
  getCommodityData(country: any) {
    let countryData = this.commodities.filter(
      (p: any) => p.country === country
    );
    this.filteredCommodities = countryData.sort(
      (a: any, b: any) => parseFloat(b.id) - parseFloat(a.id)
    );
    this.selectedCommodity = this.filteredCommodities[0];
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  removeImage(url: any) {
    console.log(this.images, url);
    this.images = this.images.filter((img: any) => img != url);
  }
}
