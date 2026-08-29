import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, OnChanges, OnDestroy, ViewChild } from "@angular/core";
import { AmchartsLoaderService } from "../../../services/amcharts-loader.service";

@Component({
  selector: 'pie-chart',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card p-3 shadow-sm">
      <h5 class="text-center">{{ title }}</h5>
      <div #chartDiv class="chart"></div>
    </div>
  `,
  styles: [`.chart{height:350px;width:100%}`]
})
export class PieChartComponent implements AfterViewInit, OnDestroy, OnChanges {

  @ViewChild('chartDiv') chartDiv!: ElementRef;
  @Input() noDataText: string = 'No data available';
  @Input() title = 'Pie Chart';
  @Input() data: any[] = [];
  @Input() keys = { label: 'name', value: 'value' };

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
    if (!this.chartDiv?.nativeElement || !this.data?.length) return;

    if (this.chart) {
      this.zone.runOutsideAngular(() => this.chart.dispose());
    }

    this.zone.runOutsideAngular(() => {
      const chart = this.am4core.create(
        this.chartDiv.nativeElement,
        this.am4charts.PieChart
      );

      chart.data = this.data;

      const series = chart.series.push(new this.am4charts.PieSeries());
      series.dataFields.value = this.keys.value;
      series.dataFields.category = this.keys.label;

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) this.chart.dispose();
    });
  }
}