import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { s3Client } from 'src/app/service/aws-sdk';
import { DataService } from 'src/app/service/data.service';
import { UtilityService } from 'src/app/service/utils.service';
import Swal from 'sweetalert2';
import { ListBucketsCommand } from '@aws-sdk/client-s3';

declare var $: any;

@Component({
  selector: 'app-commodity-price-update',
  templateUrl: './commodity-price-update.component.html',
  styleUrls: ['./commodity-price-update.component.scss'],
})
export class CommodityPriceUpdateComponent implements OnInit {
  filter: string = '';
  priceData: any = [];
  isEdit: boolean = false;
  config: any;
  startDate: any;
  endDate: any;
  isFilter: boolean = false;

  savePriceData: any = {};
  selectedCountry: any = {};
  selectedCommodity: any = {};
  commodityList: any = [];
  selectedPrice: any = {};

  today = new Date();
  priorDate = new Date(new Date().setDate(this.today.getDate() - 30));

  @ViewChild('closeCModal') modalClose!: ElementRef;

  constructor(
    public dataService: DataService,
    private utilService: UtilityService
  ) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
    };
  }

  ngOnInit(): void {
    this.selectedCountry = this.dataService.getCountries()[0];
    this.getPriceData();
    this.getCommodities();
    // this.getRun();
  }

  getCommodities() {
    this.dataService.getData().subscribe((data) => {
      this.commodityList = data.data;
      this.selectedCommodity = this.commodityList[0];
    });
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  getPriceData() {
    this.dataService.getPrices().subscribe((data) => {
      let countryData = data.data.filter(
        (p: any) => p.countryId === this.selectedCountry.code
      );
      this.priceData = countryData.reverse();
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
      this.priceData = countryData.reverse();
    });
  }

  onChange(country: string) {
    this.selectedCountry = country;
    this.getPriceData();
    this.isFilter = false;
  }

  onChangeCommodity(cm: any) {
    console.log(cm);
    this.selectedCommodity = cm;
  }

  newP() {
    this.isEdit = false;
    this.savePriceData = {};
    this.selectedCommodity = this.commodityList[0];
  }

  showEdit(data: any) {
    this.isEdit = true;
    this.savePriceData = data;
    this.selectedCommodity = this.commodityList.find(
      (el: any) => el.id === this.savePriceData.commodityId
    );
  }

  onUpdate() {
    if (
      this.selectedCountry == {} ||
      this.savePriceData.amount == '' ||
      this.selectedCommodity == {}
    ) {
      Swal.fire({
        title: 'Validation!',
        text: 'All Fields are required',
        icon: 'warning',
        showConfirmButton: false,
      });
      return;
    }
    this.utilService.showLoading();
    this.savePriceData.commodityId = this.selectedCommodity.id;
    this.savePriceData.countryId = this.selectedCountry.code;
    this.savePriceData.amount = `${this.savePriceData.amount}`;
    this.dataService
      .eidtPrice(this.savePriceData, this.savePriceData.id)
      .subscribe(
        (data) => {
          console.log(data);
          if (data.success) {
            this.modalClose.nativeElement.click();
            this.savePriceData = {};
            this.utilService.hideLoading();
            this.utilService.showSuccess('', data.message);
            this.getPriceData();
            this.getCommodities();
          }
          console.log(data);
        },
        (error) => {
          this.modalClose.nativeElement.click();
          this.savePriceData = {};
          this.utilService.hideLoading();
          this.utilService.showError('', 'All Fields are required');
          this.getPriceData();
          this.getCommodities();
        }
      );
  }

  onSave() {
    if (
      this.selectedCountry == {} ||
      this.savePriceData.amount == '' ||
      this.selectedCommodity == {}
    ) {
      Swal.fire({
        title: 'Validation!',
        text: 'All Fields are required',
        icon: 'warning',
        showConfirmButton: false,
      });
      return;
    }
    this.utilService.showLoading();
    this.savePriceData.commodityId = this.selectedCommodity.id;
    this.savePriceData.countryId = this.selectedCountry.code;
    this.savePriceData.amount = `${this.savePriceData.amount}`;
    this.dataService.savePrice(this.savePriceData).subscribe(
      (data) => {
        console.log(data);
        if (data.success) {
          this.modalClose.nativeElement.click();
          this.savePriceData = {};
          this.utilService.hideLoading();
          this.utilService.showSuccess('', data.message);
          this.getPriceData();
          this.getCommodities();
        }
        console.log(data);
      },
      (error) => {
        this.modalClose.nativeElement.click();
        this.savePriceData = {};
        this.utilService.hideLoading();
        this.utilService.showError('', 'All Fields are required');
        this.getPriceData();
        this.getCommodities();
      }
    );
  }
}
