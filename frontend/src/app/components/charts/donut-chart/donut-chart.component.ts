import {
  Component, ElementRef, ViewChild,
  Input, Output, EventEmitter,
  AfterViewInit, OnDestroy, OnChanges, SimpleChanges, NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmchartsLoaderService } from '../../../services/amcharts-loader.service';

@Component({
  selector: 'donut-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card p-3 shadow-sm">
      <h5 class="text-center">{{ title }}</h5>
      <div #chartDiv class="chart"></div>

      <div *ngIf="!data.length" class="text-center text-muted">
        {{ noDataText }}
      </div>
    </div>
  `,
  styles: [`.chart{height:350px;width:100%}`]
})
export class DonutChartComponent implements AfterViewInit, OnDestroy, OnChanges {

  @ViewChild('chartDiv') chartDiv!: ElementRef;

  @Input() title = 'Donut Chart';
  @Input() data: any[] = [];
  @Input() keys = { label: 'name', value: 'value' };
  @Input() noDataText: string = 'No data available';
  @Output() sliceClick = new EventEmitter<any>();

  private chart: any;
  private am4core: any;
  private am4charts: any;
  private viewReady = false;

  constructor(
    private zone: NgZone,
    private loader: AmchartsLoaderService
  ) {}

  async ngAfterViewInit() {
    this.viewReady = true;
    await this.loadLib();
    this.renderChart();
  }

  ngOnChanges(_: SimpleChanges) {
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

      chart.innerRadius = this.am4core.percent(60);
      chart.data = this.data;

      const series = chart.series.push(new this.am4charts.PieSeries());
      series.dataFields.value = this.keys.value;
      series.dataFields.category = this.keys.label;

      series.slices.template.strokeOpacity = 0;

      series.labels.template.disabled = false;

      series.slices.template.events.on('hit', (ev: any) => {
        this.zone.run(() => this.sliceClick.emit(ev.target.dataItem.dataContext));
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