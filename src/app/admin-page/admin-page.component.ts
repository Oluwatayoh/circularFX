import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../service/data.service';
import { ViewChild, ElementRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

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
  // form!: FormGroup;
  filter: string = '';
  config: any;
  element!: HTMLElement;
  savePriceHistory: boolean = false;

  pickUps: any = [];

  constructor(private dataService: DataService, private fb: FormBuilder) {    this.config = {
    itemsPerPage: 5,
    currentPage: 1,
  };}

  ngOnInit(): void {
    this.getPickUps();
  }


  pageChanged(event: any) {
    this.config.currentPage = event;
  }
  
  getPickUps() {
    this.dataService.getPickUps().subscribe((data) => {
      let d = data.data;
      this.pickUps = d.sort(
        (a: any, b: any) => parseFloat(b.id) - parseFloat(a.id)
      );
      console.log(this.pickUps);
      // this.pickUps = data;
    });
  }
}
