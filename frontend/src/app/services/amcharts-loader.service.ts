import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AmchartsLoaderService {
  private core: any;
  private charts: any;

  async load() {
    if (!this.core) {
      const core = await import('@amcharts/amcharts4/core');
      const charts = await import('@amcharts/amcharts4/charts');

      this.core = core;
      this.charts = charts;
    }

    return {
      am4core: this.core,
      am4charts: this.charts
    };
  }
}