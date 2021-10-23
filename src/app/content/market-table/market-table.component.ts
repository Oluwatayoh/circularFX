import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-market-table',
  templateUrl: './market-table.component.html',
  styleUrls: ['./market-table.component.scss']
})
export class MarketTableComponent implements OnInit {

  fxData: any = [];

  filter: string = '';
  config: any;

  constructor(private dataService: DataService) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
    };
  }

  pageChanged(event:any) {
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.fxData = data;
    });
  }
}
