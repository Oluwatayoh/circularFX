import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType, ChartData, ChartOptions  } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() chartData: any = [];

  data: any = [];

  constructor() {}

  ngOnInit(): void {
    this.getData();
  }

  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   scales: { xAxes: [{}], yAxes: [{}] },
  //   plugins: {
  //     datalabels: {
  //       anchor: 'end',
  //       align: 'end',
  //     }
  //   }
  // };
  // public barChartLabels: Label[];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // public barChartPlugins = [];
  // public barChartData: ChartDataSets[];



  public getData(): void {
    let lineChartData: any = [];
    let arr2: any = [];
    for (var i = 0; i < this.chartData.length; i++) {
      var obj: any = {}; // <---- Move declaration inside loop
      let arr: any = [];
      arr.push(this.chartData[i].price);
      arr2.push(this.chartData[i].name);
      obj.data = arr;
      lineChartData.push(obj);
    }

    // this.doughnutChartData.datasets = lineChartData
    // this.doughnutChartLabels = arr2;
    this.data = lineChartData;
    console.log('this is chart Data', this.data);
    this.chart?.update();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  //Coming Soon
  
}
