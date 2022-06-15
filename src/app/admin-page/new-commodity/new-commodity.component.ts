import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { UtilityService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-new-commodity',
  templateUrl: './new-commodity.component.html',
  styleUrls: ['./new-commodity.component.scss'],
})
export class NewCommodityComponent implements OnInit {
  filter2: string = '';
  commodityList: any = [];
  config2: any;
  saveCommodity: any = {};
  selectedCommodity: any = {};
  isEdit: boolean = false;
  @ViewChild('closeCModal') modalClose!: ElementRef;

  constructor(
    public dataService: DataService,
    private utilService: UtilityService
  ) {
    this.config2 = {
      itemsPerPage: 5,
      currentPage: 1,
    };
  }

  ngOnInit(): void {
    this.getCommodities();
    this.saveCommodity.isParent = false;
  }

  cmPageChanged(event: any) {
    this.config2.currentPage = event;
  }
  onChange(cm: any) {
    this.selectedCommodity = cm;
  }
  onSelect(cml: any) {
    this.isEdit = true;
    this.saveCommodity = cml;
    if (this.saveCommodity.parentId == '') {
      this.selectedCommodity = {};
    } else {
      this.selectedCommodity = this.commodityList.find(
        (el: any) => el.id === this.saveCommodity.parentId
      );
    }
  }
  getCommodities() {
    this.dataService.getData().subscribe((data) => {
      let d = data.data;
      this.commodityList = d.sort(
        (a: any, b: any) => parseFloat(b.id) - parseFloat(a.id)
      );
      this.selectedCommodity = this.commodityList[0];
    });
  }

  newC() {
    this.saveCommodity = {};
    this.isEdit = false;
  }

  onSaveCommodity() {
    if (this.saveCommodity.isParent) {
      this.saveCommodity.parentId = this.selectedCommodity.id;
    } else {
      this.saveCommodity.parentId = '';
    }
    this.utilService.showLoading();
    this.dataService.saveComodity(this.saveCommodity).subscribe((data) => {
      if (data.success) {
        this.modalClose.nativeElement.click();
        this.saveCommodity = {};
        this.utilService.hideLoading();
        this.utilService.showSuccess('', data.message);
        this.getCommodities();
        console.log(data);
      } else {
        this.modalClose.nativeElement.click();
        this.saveCommodity = {};
        this.utilService.hideLoading();
        this.utilService.showError('', data.message);
        console.log(data);
      }
    });
  }

  onUpdateCommodity() {
    if (this.saveCommodity.isParent) {
      this.saveCommodity.parentId = this.selectedCommodity.id;
    } else {
      this.saveCommodity.parentId = '';
    }
    this.utilService.showLoading();
    this.dataService
      .eidtComodity(this.saveCommodity, this.saveCommodity.id)
      .subscribe((data) => {
        if (data.success) {
          this.modalClose.nativeElement.click();
          this.saveCommodity = {};
          this.utilService.hideLoading();
          this.utilService.showSuccess('', data.message);
          this.getCommodities();
          console.log(data);
        } else {
          this.modalClose.nativeElement.click();
          this.saveCommodity = {};
          this.utilService.hideLoading();
          this.utilService.showError('', data.message);
          console.log(data);
        }
      });
  }
}
