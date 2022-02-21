import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';
import { ViewChild, ElementRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
declare var $: any;

@Component({
  // encapsulation: ViewEncapsulation.None,
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
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
export class AdminPageComponent implements OnInit {
  @ViewChild('closeCModal') closeCModal!: ElementRef;
  // @ViewChild('closeCModal', { static: false }) public closeCModal: ElementRef;
  form!: FormGroup;
  saveComodityData: any = {};
  fxData: any = [];
  monthData: any = [];
  showSub: boolean = false;
  filter: string = '';
  config: any;
  isEdit: boolean = false;
  selectedCountry: any = {};
  element!: HTMLElement;
  savePriceHistory: boolean = false;
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

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
    };
  }

  showClass(fx: any) {
    if (fx.subCommodity != 0) {
      this.showSub = !this.showSub;
    } else {
      this.showSub = false;
    }
  }

  creatForm() {
    this.form = this.fb.group({
      name: [null],
      month: [null],
      country: [this.selectedCountry.name],
      price: [null],
      percentage: [null, { disabled: true }],
      price_month: [null],
      subCommodity: this.fb.array([]),
    });
  }

  subCatFrom(): FormGroup {
    return this.fb.group({
      name: [null],
      price: [null],
      percentage: [null, { disabled: true }],
      price_month: [null],
    });
  }

  get sub(): FormArray {
    return this.form.get('subCommodity') as FormArray;
  }

  addNewContacts() {
    this.sub.push(this.subCatFrom());
  }

  removeContact(i: Required<number>) {
    this.sub.removeAt(i);
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  getCommodityData(country: any) {
    this.dataService.getData().subscribe((data) => {
      let countryData = data.data.filter((p: any) => p.country === country);
      this.fxData = countryData.sort(
        (a: any, b: any) => parseFloat(b.id) - parseFloat(a.id)
      );
    });
  }

  onChange(country: string) {
    this.selectedCountry = country;
    this.getCommodityData(this.selectedCountry.name);
    this.form.controls['country'].setValue(this.selectedCountry.name);
  }

  ngOnInit(): void {
    this.selectedCountry = this.countries[0];
    this.creatForm();
    this.getCommodityData(this.selectedCountry.name);
    this.saveComodityData.country = this.selectedCountry.name;
    this.monthData = new Array();
    this.monthData[0] = 'January';
    this.monthData[1] = 'February';
    this.monthData[2] = 'March';
    this.monthData[3] = 'April';
    this.monthData[4] = 'May';
    this.monthData[5] = 'June';
    this.monthData[6] = 'July';
    this.monthData[7] = 'August';
    this.monthData[8] = 'September';
    this.monthData[9] = 'October';
    this.monthData[10] = 'November';
    this.monthData[11] = 'December';
  }

  getPercentageChange(oldNumber: any, newNumber: any) {
    var decreaseValue = newNumber - oldNumber;
    return Math.round((decreaseValue / oldNumber) * 100);
  }

  valuechange(i: number): void {
    this.form.controls['percentage'].patchValue(
      this.getPercentageChange(i, this.form.get('price')?.value)
    );
  }

  valuechange2(i: number, idx: number): void {
    const price = (
      (this.form.get('subCommodity') as FormArray).at(idx) as FormGroup
    ).get('price')?.value;
    ((this.form.get('subCommodity') as FormArray).at(idx) as FormGroup)
      .get('percentage')
      ?.patchValue(this.getPercentageChange(i, price));
  }

  showEdit(data: any) {
    this.saveComodityData = data;
    console.log(this.saveComodityData);
    this.isEdit = true;
    this.form.patchValue({
      name: this.saveComodityData.name,
      month: this.saveComodityData.month,
      country: this.saveComodityData.country,
      price: this.saveComodityData.price,
      percentage: this.saveComodityData.percentage,
      price_month: this.saveComodityData.price_month,
    });
    this.form.setControl(
      'subCommodity',
      this.setExistingData(data.subCommodity)
    );
  }

  setExistingData(sub: any): FormArray {
    const formArray = new FormArray([]);
    sub.forEach((e: any) => {
      formArray.push(
        this.fb.group({
          name: e.name,
          price: e.price,
          percentage: e.percentage,
          price_month: e.price_month,
        })
      );
    });
    return formArray;
  }

  showNew() {
    this.saveComodityData = {};
    this.isEdit = false;
  }

  onDelete(data: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteComodity(data._id).subscribe((data) => {
          if (data.success == true) {
            this.getCommodityData(this.selectedCountry.name);
            Swal.fire('Deleted!', data.message, 'success');
          } else {
            Swal.fire('Error!', data.message, 'error');
          }
        });
      }
    });
  }

  onUpdate() {
    if (
      this.form.get('name')?.value == null ||
      this.form.get('name')?.value == '' ||
      this.form.get('price')?.value == null ||
      this.form.get('price')?.value == ''
    ) {
      Swal.fire({
        title: 'Validation!',
        text: 'Comodity name and price is required',
        icon: 'warning',
        showConfirmButton: false,
      });
      return;
    }
    Swal.fire('', 'Please Wait...');
    Swal.showLoading();

    // this.saveComodityData.country = this.selectedCountry.name;

    this.form.controls['percentage'].setValue(
      this.form.get('price_month')?.value != null ||
        this.form.get('price_month')?.value != ''
        ? this.getPercentageChange(
            this.form.get('price_month')?.value,
            this.form.get('price')?.value
          )
        : 0
    );
    this.form.get('price_month')?.value == null
      ? this.form.controls['price_month'].setValue(0)
      : this.form.get('price_month')?.value;
    this.dataService
      .eidtComodity(this.form.value, this.saveComodityData._id)
      .subscribe((data) => {
        if (data.success == true) {
          Swal.close();
          Swal.fire({
            title: 'Successful!',
            text: 'Comodity Updated successfully',
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.getCommodityData(this.selectedCountry.name);
              this.close();
            }
          });
        }
        console.log(data);
      });
  }

  onSave() {
    if (
      this.form.get('name')?.value == null ||
      this.form.get('name')?.value == '' ||
      this.form.get('price')?.value == null ||
      this.form.get('price')?.value == ''
    ) {
      Swal.fire({
        title: 'Validation!',
        text: 'Comodity name and price is required',
        icon: 'warning',
        showConfirmButton: false,
      });
      return;
    }
    Swal.fire('', 'Please Wait...');
    Swal.showLoading();

    // this.saveComodityData.country = this.selectedCountry.name;

    this.form.controls['percentage'].setValue(
      this.form.get('price_month')?.value != null ||
        this.form.get('price_month')?.value != ''
        ? this.getPercentageChange(
            this.form.get('price_month')?.value,
            this.form.get('price')?.value
          )
        : 0
    );
    this.form.get('price_month')?.value == null
      ? this.form.controls['price_month'].setValue(0)
      : this.form.get('price_month')?.value;
    this.form.get('subCommodity')?.value == []
      ? this.form.controls['subCommodity'].setValue(null)
      : this.form.get('subCommodity')?.value;
    this.dataService.saveComodity(this.form.value).subscribe((data) => {
      if (data.success == true) {
        Swal.close();
        Swal.fire({
          title: 'Successful!',
          text: 'Comodity saved successfully',
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.getCommodityData(this.selectedCountry.name);
            this.close();
          }
        });
      }
      console.log(data);
    });
  }

  close() {
    this.element = document.getElementById('closeCModal') as HTMLElement;
    this.element.click();
  }

  onCheckboxChange(e: any) {
    this.savePriceHistory = e.target.checked;
  }
}
