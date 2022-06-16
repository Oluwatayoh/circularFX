import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: string = `${environment.baseUrl}`;

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

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any>(`${this.baseUrl}commodity`);
  }

  saveComodity(data: any) {
    return this.http.post<any>(`${this.baseUrl}commodity/create`, data);
  }

  eidtComodity(data: any, id: number) {
    return this.http.put<any>(`${this.baseUrl}commodity/update/${id}`, data);
  }

  getPrices() {
    return this.http.get<any>(`${this.baseUrl}price`);
  }

  getPricesByCountry(countryId: string) {
    let da = {
      countryId: countryId,
    };
    return this.http.post<any>(`${this.baseUrl}price/countryId`, da);
  }

  savePrice(data: any) {
    return this.http.post<any>(`${this.baseUrl}price/create`, data);
  }

  eidtPrice(data: any, id: number) {
    return this.http.put<any>(`${this.baseUrl}price/update/${id}`, data);
  }
  filterPriceWithDate(data: any) {
    return this.http.post<any>(`${this.baseUrl}price/search`, data);
  }

  saveHistory(data: any) {
    return this.http.post<any>(`${this.baseUrl}pricehistories`, data);
  }

  deleteComodity(id: any) {
    return this.http.delete<any>(`${this.baseUrl}commodity/${id}`);
  }

  getCountries() {
    return this.countries;
  }

  //PickUps

  getPickUps() {
    return this.http.get<any>(`${this.baseUrl}pickup`);
  }
  savePickUp(data: any) {
    return this.http.post<any>(`${this.baseUrl}pickup/create`, data);
  }

  //Send SMS
  sendSMS(to: string, message: string) {
    let str = to.substring(1);
    let fTo = '234' + str;
    var data = {
      to: fTo,
      from: 'N-Alert',
      sms: message,
      type: 'plain',
      api_key: environment.TERMII_API_KEY,
      channel: 'dnd',
    };

    const smsD = JSON.stringify(data);

    return this.http.post<any>(
      `${environment.TERMII_BASE_URL}api/sms/send`,
      smsD
    );
  }
}
