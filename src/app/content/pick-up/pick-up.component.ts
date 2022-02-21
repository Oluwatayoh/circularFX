import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.component.html',
  styleUrls: ['./pick-up.component.scss'],
})
export class PickUpComponent implements OnInit {
  constructor(public zone: NgZone) {}
  userAddress: string = '';
  userLatitude: string = '';
  userLongitude: string = '';
  urls: any = [];
  files: any;

  pickupDetails!: String;

  ngOnInit(): void {}

  @ViewChild('placesRef') placesRef!: GooglePlaceDirective;
  @ViewChild('inputFile') myFiles!: ElementRef;

  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address;
    this.userLatitude = address.geometry.location.lat();
    this.userLongitude = address.geometry.location.lng();
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
}
