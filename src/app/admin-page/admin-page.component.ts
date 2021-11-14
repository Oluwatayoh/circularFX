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

  constructor(private dataService: DataService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
    };
  }


  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  getCommodityData() {
    this.dataService.getData().subscribe((data) => {
      this.fxData =
        data.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id));
    });
  }

  ngOnInit(): void {
    this.getCommodityData();
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

    console.log(this.monthData)
  }


  getPercentageChange(oldNumber: any, newNumber: any) {
    var decreaseValue = oldNumber - newNumber;
    return Math.round((decreaseValue / oldNumber) * 100);
  }

  valuechange(i: number): void {
    this.saveComodityData.percentage = this.getPercentageChange(i, this.saveComodityData.price)
  }

  showEdit(data: any) {
    this.saveComodityData = data;
    this.isEdit = true;
  }
  showNew(){
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
          this.getCommodityData();
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
            this.getCommodityData();
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
            this.getCommodityData();
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
