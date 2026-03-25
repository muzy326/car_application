import {
  Component,
  ElementRef,
  NgZone,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
  selector: 'bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card shadow-sm p-3">
      <h5 class="text-center mb-3">{{ title }}</h5>
      <div #chartDiv class="chart-container"></div>
      <div *ngIf="!dataFound" class="text-center text-muted mt-3">
        {{ noDataText || 'No chart data available' }}
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
export class BarChartComponent implements AfterViewInit, OnDestroy, OnChanges {

  @ViewChild('chartDiv', { static: false }) chartDiv!: ElementRef;

  @Input() title: string = 'Bar Chart';
  @Input() data: any[] = [];
  @Input() categoryField: string = 'name';
  @Input() valueField: string = 'value';
  @Input() noDataText: string = 'No chart data available';

  @Output() barClicked = new EventEmitter<any>();

  private chart!: am4charts.XYChart;
  dataFound = true;

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChart();
    }
  }

  private updateChart() {
    if (!this.chartDiv) return;

    // Dispose previous chart if exists
    if (this.chart) {
      this.zone.runOutsideAngular(() => this.chart.dispose());
    }

    // Check if data exists
    if (!this.data || this.data.length === 0) {
      // Update dataFound safely
      this.zone.run(() => {
        this.dataFound = false;
        this.cdr.detectChanges(); // <-- Prevent ExpressionChangedAfterItHasBeenCheckedError
      });
      return;
    }

    // Data exists, show chart
    this.zone.run(() => {
      this.dataFound = true;
      this.cdr.detectChanges();
    });

    this.zone.runOutsideAngular(() => {
      const chart = am4core.create(this.chartDiv.nativeElement, am4charts.XYChart);
      chart.data = this.data;
      this.chart = chart;

      // X axis
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = this.categoryField;
      categoryAxis.renderer.grid.template.location = 0;

      // Y axis
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

      // Series
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryX = this.categoryField;
      series.dataFields.valueY = this.valueField;
      series.columns.template.tooltipText = `{${this.categoryField}}: {${this.valueField}}`;
      series.columns.template.strokeOpacity = 0;

      // Click event
      series.columns.template.events.on("hit", (ev: any) => {
        this.zone.run(() => {
          this.barClicked.emit(ev.target.dataItem.dataContext);
        });
      });

      chart.cursor = new am4charts.XYCursor();
    });
  }

  ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.chart) this.chart.dispose();
    });
  }
}