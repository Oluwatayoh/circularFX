import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';
import {
  ViewChild,
  ElementRef
} from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  @ViewChild('closeCModal') closeModal: any;

  saveComodityData: any = {};
  fxData: any = [];
  monthData: any = [];
  filter: string = '';
  config: any;
  isEdit: boolean = false;
  selectedCountry: any = {};
  countries: any = [
    {
      "name": "Nigeria",
      "code": "NG",
      "capital": "Abuja",
      "region": "AF",
      "currency": {
        "code": "NGN",
        "name": "Nigerian naira",
        "symbol": "₦"
      },
      "language": {
        "code": "en",
        "name": "English",
      },
      "flag": "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg"
    },
    {
      "name": "Ghana",
      "code": "GH",
      "capital": "Accra",
      "region": "AF",
      "currency": {
        "code": "GHS",
        "name": "Ghanaian cedi",
        "symbol": "₵"
      },
      "language": {
        "code": "en",
        "name": "English",
      },
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg",
    },
    {
      "name": "Cameroon",
      "code": "CM",
      "capital": "Yaoundé",
      "region": "AF",
      "currency": {
        "code": "XAF",
        "name": "Central African CFA franc",
        "symbol": "Fr"
      },
      "language": {
        "code": "en",
        "name": "English",
      },
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Flag_of_Cameroon.svg",
    },
    {
      "name": "South Africa",
      "code": "ZA",
      "capital": "Pretoria",
      "region": "AF",
      "currency": {
        "code": "ZAR",
        "name": "South African rand",
        "symbol": "R"
      },
      "language": {
        "code": "en",
        "iso639_2": "eng",
        "name": "English",
        "nativeName": "English"
      },
      "flag": "https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg"
    }, {
      "name": "Kenya",
      "code": "KE",
      "capital": "Nairobi",
      "region": "AF",
      "currency": {
        "code": "KES",
        "name": "Kenyan shilling",
        "symbol": "Sh"
      },
      "language": {
        "code": "en",
        "name": "English",
      },
      "flag": "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg"
    }, {
      "name": "Rwanda",
      "code": "RW",
      "capital": "Kigali",
      "region": "AF",
      "currency": {
        "code": "RWF",
        "name": "Rwandan franc",
        "symbol": "Fr"
      },
      "language": {
        "code": "rw",
        "name": "Kinyarwanda",
      },
      "flag": "https://upload.wikimedia.org/wikipedia/commons/1/17/Flag_of_Rwanda.svg"
    }, {
      "name": "Tanzania",
      "code": "TZ",
      "capital": "Dodoma",
      "region": "AF",
      "currency": {
        "code": "TZS",
        "name": "Tanzanian shilling",
        "symbol": "Sh"
      },
      "language": {
        "code": "en",
        "name": "English",
      },
      "flag": "https://restcountries.eu/data/tza.svg"
    }, {
      "name": "Egypt",
      "code": "EG",
      "capital": "Cairo",
      "region": "AF",
      "currency": {
        "code": "EGP",
        "name": "Egyptian pound",
        "symbol": "£"
      },
      "language": {
        "code": "ar",
        "name": "Arabic",
      },
      "flag": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg",
    }, {
      "name": "Morocco",
      "code": "MA",
      "capital": "Rabat",
      "region": "AF",
      "currency": {
        "code": "MAD",
        "name": "Moroccan dirham",
        "symbol": "د.م."
      },
      "language": {
        "code": "ar",
        "name": "Arabic",
      },
      "flag": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg"
    },
  ]

  constructor(private dataService: DataService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
    };
  }


  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  getCommodityData(country: any) {
    this.dataService.getData().subscribe((data) => {
      let countryData = data.filter((p: any) => (p.country === country));
      
       this.fxData =
       countryData.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id));
    });
  }

  onChange(country: string) {
    this.selectedCountry = country;
    this.getCommodityData(this.selectedCountry.name);
    this.saveComodityData.country = this.selectedCountry.name;
  }


  ngOnInit(): void {
    this.selectedCountry = this.countries[0];
    this.getCommodityData(this.selectedCountry.name);
    this.saveComodityData.country = this.selectedCountry.name;
    this.monthData = new Array();
    this.monthData[0] = "January";
    this.monthData[1] = "February";
    this.monthData[2] = "March";
    this.monthData[3] = "April";
    this.monthData[4] = "May";
    this.monthData[5] = "June";
    this.monthData[6] = "July";
    this.monthData[7] = "August";
    this.monthData[8] = "September";
    this.monthData[9] = "October";
    this.monthData[10] = "November";
    this.monthData[11] = "December";
  }


  getPercentageChange(oldNumber: any, newNumber: any) {
    var decreaseValue = newNumber - oldNumber;
    return Math.round((decreaseValue / oldNumber) * 100);
  }

  valuechange(i: number): void {
    this.saveComodityData.percentage = this.getPercentageChange(i, this.saveComodityData.price)
  }

  showEdit(data: any) {
    this.saveComodityData = data;
    this.isEdit = true;
  }
  showNew() {
    this.saveComodityData = {}
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
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteComodity(data.id).subscribe(data => {
          this.getCommodityData(this.selectedCountry);
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }


  onUpdate() {
    if (this.saveComodityData.name == null || this.saveComodityData.price == null) {
      Swal.fire({
        title: 'Validation!',
        text: 'Comodity name and price is required',
        icon: 'warning',
        showConfirmButton: false,
      })
      return
    }
    Swal.fire('', 'Please Wait...')
    Swal.showLoading()

    this.saveComodityData.percentage = this.saveComodityData.price_month != null || this.saveComodityData.price_month != "" ? this.getPercentageChange(this.saveComodityData.price_month, this.saveComodityData.price) : 0;
    this.saveComodityData.price_month == null ? this.saveComodityData.price_month = 0 : this.saveComodityData.price_month;
    console.log(this.saveComodityData.month);
    this.dataService.eidtComodity(this.saveComodityData).subscribe(data => {
      if (data.id != null) {
        Swal.close()
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
            this.closeModal.nativeElement.click();
            // document.getElementById("closeModalButton").click();
            // $("#newCommodity .close").toggle()
            // $('#newCommodity').modal().hide();
            // $('#newCommodity').hide;
          }
        })
      }
      console.log(data);
    });
  }

  onSave() {
    if (this.saveComodityData.name == null || this.saveComodityData.price == null) {
      Swal.fire({
        title: 'Validation!',
        text: 'Comodity name and price is required',
        icon: 'warning',
        showConfirmButton: false,
      })
      return
    }
    Swal.fire('', 'Please Wait...')
    Swal.showLoading()

    this.saveComodityData.country = this.selectedCountry.name;
    this.saveComodityData.percentage = this.saveComodityData.price_month != null || this.saveComodityData.price_month != "" ? this.getPercentageChange(this.saveComodityData.price_month, this.saveComodityData.price) : 0;
    this.saveComodityData.price_month == null ? this.saveComodityData.price_month = 0 : this.saveComodityData.price_month;
    console.log(this.saveComodityData.month);
    this.dataService.saveComodity(this.saveComodityData).subscribe(data => {
      if (data.id != null) {
        Swal.close()
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
            this.closeModal.nativeElement.click();
            // document.getElementById("closeModalButton").click();
            // $("#newCommodity .close").toggle()
            // $('#newCommodity').modal().hide();
            // $('#newCommodity').hide;
          }
        })
      }
      console.log(data);
    });
  }

}
