import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  fxData: any = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.fxData = data;
    });
  }

  getPercentageVal(d:String){
    return
// console.log(val);
  }
}
