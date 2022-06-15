import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { DataService } from 'src/app/service/data.service';
import { UtilityService } from 'src/app/service/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.component.html',
  styleUrls: ['./pick-up.component.scss'],
})
export class PickUpComponent implements OnInit {
  constructor(
    public dataService: DataService,
    private utilService: UtilityService
  ) {}
  urls: any = [];
  files: any;
  pickupData: any = {};
  pickupDetails!: String;

  selectedCommodity: any = {};
  commodityList: any = [];

  ngOnInit(): void {
    this.getCommodities();
  }

  @ViewChild('inputFile') myFiles!: ElementRef;

  getAddress(place: any) {
    const addressFrom = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      city: 'sublocality_level_1',
      state: 'short_name',
      country: 'long_name',
      postal_code: 'short_name',
    };
    place.address_components.forEach((add: any) => {
      add.types.forEach((addType: any) => {
        if (addType == 'street_number')
          addressFrom.street_number = add.short_name;
        if (addType == 'route') addressFrom.route = add.long_name;
        if (addType == 'locality' || addType == 'sublocality_level_1')
          addressFrom.city = add.long_name;
        if (addType == 'administrative_area_level_1')
          addressFrom.state = add.long_name;
        if (addType == 'country') addressFrom.country = add.long_name;
        if (addType == 'postal_code') addressFrom.postal_code = add.long_name;
      });
    });

    this.pickupData.address = `${addressFrom.street_number} ${addressFrom.route}, ${addressFrom.city}, ${addressFrom.state}, ${addressFrom.country} ${addressFrom.postal_code}`;
    console.log(this.pickupData.address);
  }

  getCommodities() {
    this.dataService.getData().subscribe((data) => {
      this.commodityList = data.data;
      this.selectedCommodity = this.commodityList[0];
    });
  }

  onChangeCommodity(cm: any) {
    this.selectedCommodity = cm;
  }

  onSelect(e: any) {
    if (e.target.files) {
      console.log(e.target.files);
      if (e.target.files.length > 4) {
        this.urls = [];
        this.files = '';
        e.target.value = '';
        this.myFiles.nativeElement.value = '';
        Swal.fire({
          title: 'Warning !!',
          text: 'Maximum Image upload is 4',
          icon: 'warning',
          showConfirmButton: false,
        });

        return;
      } else {
        for (let i = 0; i < e.target.files.length; i++) {
          var reader = new FileReader();
          reader!.readAsDataURL(e.target.files[i]);
          reader.onload = (events: any) => {
            this.urls.push(events.target.result);
          };
        }
      }
    }
  }

  onSave() {
    this.pickupData.commodityId = this.selectedCommodity.id;
    this.pickupData.imageUrl = [
      'https://static.remove.bg/remove-bg-web/eb1bb48845c5007c3ec8d72ce7972fc8b76733b1/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg',
    ];
    this.utilService.showLoading();
    this.dataService.savePickUp(this.pickupData).subscribe((data) => {
      if (data.success) {
        this.pickupData = {};
        this.utilService.hideLoading();
        this.utilService.showSuccess('', data.message);
        console.log(data);
      } else {
        this.pickupData = {};
        this.utilService.hideLoading();
        this.utilService.showError('', data.message);
        console.log(data);
      }
    });
  }
}
