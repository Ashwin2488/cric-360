import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() chartData;
  @Input() chartType;
  chartTypeMap = {
    batting: {
      columnValueProperty: 'runs',
      columnValueLabelProperty: 'Runs',
      lineValueProperty: 'strikeRate',
      lineValueLabelProperty: 'Strike Rate'
    },
    bowling: {
      columnValueProperty: 'wickets',
      columnValueLabelProperty: 'Wickets',
      lineValueProperty: 'economy',
      lineValueLabelProperty: 'Bowling Economy'
    }
  };
  chartObj = null;
  fontColor = '#000000';
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

  ngOnInit() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.fontColor = '#ffffff';
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.fontColor = e.matches ? '#ffffff' : '#000000';
    });
  }
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
      this.chartObj = am4core.create(`barChartDiv${this.chartType}`, am4charts.XYChart);
      // this.chartObj.exporting.menu = new am4core.ExportMenu();

      /* Create axes */
      const categoryAxis = this.chartObj.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'match';
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.renderer.labels.template.fill = am4core.color(this.fontColor);
      categoryAxis.renderer.labels.template.rotation = 290;
      categoryAxis.renderer.labels.template.disabled = true;
      /* Create value axis */
      const valueAxis = this.chartObj.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.labels.template.fill = am4core.color(this.fontColor);

      /* Create series */
      const columnSeries = this.chartObj.series.push(new am4charts.ColumnSeries());
      columnSeries.name = this.chartTypeMap[this.chartType].columnValueLabelProperty;
      columnSeries.dataFields.valueY = this.chartTypeMap[this.chartType].columnValueProperty;
      columnSeries.dataFields.categoryX = 'match';
      columnSeries.columns.template.column.cornerRadiusTopRight = 10;
      columnSeries.columns.template.column.cornerRadiusTopLeft = 10;
      columnSeries.columns.template.tooltipText = '[#fff font-size: 15px]{name} {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]';
      columnSeries.columns.template.propertyFields.fillOpacity = 'fillOpacity';
      columnSeries.columns.template.propertyFields.stroke = 'stroke';
      columnSeries.columns.template.propertyFields.strokeWidth = 'strokeWidth';
      columnSeries.columns.template.propertyFields.strokeDasharray = 'columnDash';
      columnSeries.tooltip.label.textAlign = 'middle';

      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
      columnSeries.columns.template.adapter.add('fill', (fill, target) => {
        return this.chartObj.colors.getIndex(target.dataItem.index);
      });

      const labelBullet = columnSeries.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.verticalCenter = 'bottom';
      labelBullet.label.dy = -10;
      labelBullet.label.text = `{${this.chartTypeMap[this.chartType].columnValueProperty}}`;
      labelBullet.label.fontSize = '12';
      labelBullet.label.fill = am4core.color(this.fontColor);

      const lineSeries = this.chartObj.series.push(new am4charts.LineSeries());
      lineSeries.name = this.chartTypeMap[this.chartType].lineValueLabelProperty;
      lineSeries.dataFields.valueY = this.chartTypeMap[this.chartType].lineValueProperty;
      lineSeries.dataFields.categoryX = 'match';

      lineSeries.stroke = am4core.color('#fdd400');
      lineSeries.strokeWidth = 3;
      lineSeries.propertyFields.strokeDasharray = 'lineDash';
      lineSeries.tooltip.label.textAlign = 'middle';

      const bullet = lineSeries.bullets.push(new am4charts.Bullet());
      bullet.fill = am4core.color('#fdd400'); // tooltips grab fill from parent by default
      bullet.tooltipText = '[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]';
      const circle = bullet.createChild(am4core.Circle);
      circle.radius = 4;
      circle.fill = am4core.color('#fff');
      circle.strokeWidth = 3;

      this.chartObj.data = this.chartData;
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
