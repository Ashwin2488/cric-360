import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() chartCategory;
  @Input() chartData;
  chartObj = null;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

  ngOnInit() {}
  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngAfterViewInit() {
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      this.chartObj = am4core.create(this.chartCategory, am4charts.PieChart);
      // this.chartObj.data = [{
      //   country: 'Lithuania',
      //   litres: 501.9
      // }, {
      //   country: 'Czech Republic',
      //   litres: 301.9
      // }, {
      //   country: 'Ireland',
      //   litres: 201.1
      // }, {
      //   country: 'Germany',
      //   litres: 165.8
      // }, {
      //   country: 'Australia',
      //   litres: 139.9
      // }, {
      //   country: 'Austria',
      //   litres: 128.3
      // }, {
      //   country: 'UK',
      //   litres: 99
      // }, {
      //   country: 'Belgium',
      //   litres: 60
      // }, {
      //   country: 'The Netherlands',
      //   litres: 50
      // }];
      this.chartObj.data = this.chartData;
      const pieSeries = this.chartObj.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'total';
      pieSeries.dataFields.category = 'dismissal';
      pieSeries.labels.template.disabled = true;
      this.chartObj.radius = am4core.percent(95);
      // Create custom legend
      this.chartObj.events.on('ready', (event) => {
        // populate our custom legend when chart renders
        this.chartObj.customLegend = document.getElementById(`legend-${this.chartCategory}`);
        pieSeries.dataItems.each((row, i) => {
          const color = this.chartObj.colors.getIndex(i);
          const percent = Math.round(row.values.value.percent * 100) / 100;
          const value = row.value;
          const legend = document.getElementById(`legend-${this.chartCategory}`);
          legend.innerHTML += '<div class="legend-item" id="legend-item-' + i + '" ' +
            'style="color: ' + color + ';"><div class="legend-marker" style="background: ' + color + '"></div>' +
            row.category + '<div class="legend-value">' + value + ' | ' + percent + '%</div></div>';
        });
      });
    });
  }
  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      this.chartData = null;
      if (this.chartObj) {
        this.chartObj.dispose();
      }
    });
  }
}
