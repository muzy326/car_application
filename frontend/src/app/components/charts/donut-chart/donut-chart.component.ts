import { Component, ElementRef, NgZone, ViewChild, Output, EventEmitter, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'donut-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card shadow-sm p-3">
      <h5 class="text-center mb-3">{{ title }}</h5>
      <div #chartDiv class="chart-container"></div>
      <div *ngIf="!dataFound" class="text-center text-muted mt-3">
        {{ noDataText || 'No data available' }}
      </div>
    </div>
  `,
  styles: [`
    .chart-container {
      width: 100%;
      height: 350px;
    }
  `]
})
export class DonutChartComponent implements AfterViewInit, OnDestroy,OnDestroy, OnChanges {

  @ViewChild('chartDiv', { static: false }) chartDiv!: ElementRef;

  @Input() title: string = 'Donut Chart';
  @Input() data: any[] = [];
  @Input() keys: { label: string, value: string } = { label: 'name', value: 'value' };
  @Input() noDataText: string = 'No data available';
  @Input() clickable: boolean = false;

  @Output() sliceClick = new EventEmitter<any>();

  private chart!: am4charts.PieChart;
  dataFound = true;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.createChart();
  }

  private createChart() {
    if (!this.chartDiv) return;

    this.dataFound = this.data && this.data.length > 0;

  if (!this.dataFound) {
    if (this.chart) {
    this.chart.dispose();
  }
  return;
}

    if (this.chart) this.chart.dispose();

    this.dataFound = this.data.length > 0;
    if (!this.dataFound) return;

    this.zone.runOutsideAngular(() => {
      const chart = am4core.create(this.chartDiv.nativeElement, am4charts.PieChart);
      chart.innerRadius = am4core.percent(60);
      chart.data = this.data;

      const series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = this.keys.value;
      series.dataFields.category = this.keys.label;

      series.slices.template.strokeOpacity = 0;
      series.labels.template.text = `{${this.keys.label}} ({${this.keys.value}})`;
      series.slices.template.tooltipText = `{${this.keys.label}}: {${this.keys.value}}`;

      if (this.clickable) {
        series.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
        series.slices.template.events.on("hit", (ev: any) => {
          this.zone.run(() => this.sliceClick.emit(ev.target.dataItem.dataContext));
        });
      }

      this.chart = chart;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
  if (changes['data'] && this.chartDiv) {
    this.createChart();
  }
}

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.chart) this.chart.dispose();
    });
  }
}