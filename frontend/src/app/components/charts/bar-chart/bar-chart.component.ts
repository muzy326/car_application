import { AfterViewInit, Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output, ViewChild } from "@angular/core";
import { AmchartsLoaderService } from "../../../services/amcharts-loader.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card p-3 shadow-sm">
      <h5 class="text-center">{{ title }}</h5>
      <div #chartDiv class="chart"></div>
    </div>
  `,
  styles: [`.chart{height:350px;width:100%}`]
})
export class BarChartComponent implements AfterViewInit, OnDestroy, OnChanges {

  @ViewChild('chartDiv') chartDiv!: ElementRef;

  @Input() title = 'Bar Chart';
  @Input() data: any[] = [];
  @Input() categoryField = 'name';
  @Input() valueField = 'value';
  @Input() noDataText: string = 'No chart data available';
  @Output() barClicked = new EventEmitter<any>();

  private chart: any;
  private am4core: any;
  private am4charts: any;
  private viewReady = false;

  constructor(private zone: NgZone, private loader: AmchartsLoaderService) {}

  async ngAfterViewInit() {
    this.viewReady = true;
    await this.loadLib();
    this.renderChart();
  }

  ngOnChanges() {
    if (this.viewReady) this.renderChart();
  }

  private async loadLib() {
    const lib = await this.loader.load();
    this.am4core = lib.am4core;
    this.am4charts = lib.am4charts;
  }

  private renderChart() {
    if (!this.chartDiv?.nativeElement || !this.data?.length) {
      if (this.noDataText) {
        this.chartDiv.nativeElement.innerHTML = this.noDataText;
      }
      return;
    }

    if (this.chart) {
      this.zone.runOutsideAngular(() => this.chart.dispose());
    }

    this.zone.runOutsideAngular(() => {
      const chart = this.am4core.create(
        this.chartDiv.nativeElement,
        this.am4charts.XYChart
      );

      chart.data = this.data;

      const categoryAxis = chart.xAxes.push(new this.am4charts.CategoryAxis());
      categoryAxis.dataFields.category = this.categoryField;

      const valueAxis = chart.yAxes.push(new this.am4charts.ValueAxis());

      const series = chart.series.push(new this.am4charts.ColumnSeries());
      series.dataFields.categoryX = this.categoryField;
      series.dataFields.valueY = this.valueField;

      series.columns.template.events.on('hit', (ev: any) => {
        this.zone.run(() => {
          this.barClicked.emit(ev.target.dataItem.dataContext);
        });
      });

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) this.chart.dispose();
    });
  }
}