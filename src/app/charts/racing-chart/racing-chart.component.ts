import {AfterViewInit, Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {ModalController} from '@ionic/angular';
@Component({
  selector: 'app-racing-chart',
  templateUrl: './racing-chart.component.html',
  styleUrls: ['./racing-chart.component.scss'],
})
export class RacingChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() chartData = null;
  fontColor = '#000000';
  chartObj = null;
  intervalObj;
  private chart: am4charts.XYChart;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone,
              private modalController: ModalController) { }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngOnInit() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.fontColor = '#ffffff';
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.fontColor = e.matches ? '#ffffff' : '#000000';
    });
  }
  ngAfterViewInit()
  {
    // Chart code goes in here
    if (this.chartData) {
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);

        this.chartObj = am4core.create('chartdiv', am4charts.XYChart);

        this.chartObj.padding(40, 40, 40, 40);
        this.chartObj.numberFormatter.bigNumberPrefixes = [
          {number: 1e+3, suffix: 'K'}
        ];
        const label = this.chartObj.plotContainer.createChild(am4core.Label);
        label.x = am4core.percent(97);
        label.y = am4core.percent(95);
        label.horizontalCenter = 'right';
        label.verticalCenter = 'middle';
        label.dx = -15;
        label.fontSize = 24;
        label.fill = am4core.color(this.fontColor);

        const playButton = this.chartObj.plotContainer.createChild(am4core.PlayButton);
        playButton.x = am4core.percent(97);
        playButton.y = am4core.percent(95);
        playButton.dy = -2;
        playButton.verticalCenter = 'middle';
        playButton.events.on('toggled', (event) => {
          if (event.target.isActive) {
            play();
          } else {
            stop();
          }
        });
        const stepDuration = 4000;

        const categoryAxis = this.chartObj.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = 'player';
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.labels.template.fill = am4core.color(this.fontColor);
        categoryAxis.renderer.labels.template.fontSize = '18';

        const valueAxis = this.chartObj.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.rangeChangeEasing = am4core.ease.linear;
        valueAxis.rangeChangeDuration = stepDuration;
        valueAxis.extraMax = .1;
        valueAxis.renderer.labels.template.fill = am4core.color(this.fontColor);


        const series = this.chartObj.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = 'player';
        series.dataFields.valueX = 'runs';
        series.tooltipText = '{valueX.value}';
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;
        series.interpolationDuration = stepDuration;
        series.interpolationEasing = am4core.ease.linear;

        const labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.horizontalCenter = 'middle';
        // labelBullet.label.text = '{values.valueX.workingValue.formatNumber(\'#.as\')}';
        labelBullet.label.text = '{runs}';
        labelBullet.label.textAlign = 'end';
        labelBullet.label.dx = 15;
        labelBullet.label.fontSize = '16';
        labelBullet.label.fill = am4core.color(this.fontColor);
        // labelBullet.label.fontWeight = 'bold';
        labelBullet.label.truncate = false;


        this.chartObj.zoomOutButton.disabled = true;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add('fill', (fill, target) => {
          return this.chartObj.colors.getIndex(target.dataItem.index);
        });

        let matchNo = 1;
        label.text = `Match ${matchNo}`;

        const stop = () => {
          if (this.intervalObj) {
            clearInterval(this.intervalObj);
          }
        };
        const nextMatch = () => {
          matchNo++;

          if (matchNo > Object.keys(allData).length) {
            matchNo = 0;
            stop();
            playButton.isActive = false;
            return;
          }

          const newData = allData[matchNo];
          let itemsWithNonZero = 0;
          for (let i = 0; i < this.chartObj.data.length; i++) {
            this.chartObj.data[i].runs = newData[i].runs;
            if (this.chartObj.data[i].runs > 0) {
              itemsWithNonZero++;
            }
          }

          if (matchNo === 1) {
            series.interpolationDuration = stepDuration / 4;
            valueAxis.rangeChangeDuration = stepDuration / 4;
          } else {
            series.interpolationDuration = stepDuration;
            valueAxis.rangeChangeDuration = stepDuration;
          }

          this.chartObj.invalidateRawData();
          label.text = `Match ${matchNo}`;

          categoryAxis.zoom({start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length});
        };
        const play = () => {
          this.intervalObj = setInterval(() => {
            nextMatch();
          }, stepDuration);
          nextMatch();
        };

        categoryAxis.sortBySeries = series;

        // const allData = {
        //   1: [
        //     {
        //       player: 'Dinesh',
        //       runs: 50
        //     },
        //     {
        //       player: 'Ashwin',
        //       runs: 12
        //     },
        //     {
        //       player: 'karthik',
        //       runs: 30
        //     },
        //     {
        //       player: 'Sara',
        //       runs: 20
        //     },
        //     {
        //       player: 'Saktheesh',
        //       runs: 20
        //     },
        //     {
        //       player: 'Pramod',
        //       runs: 5
        //     },
        //     {
        //       player: 'Darvin',
        //       runs: 0
        //     },
        //   ],
        //   2: [
        //     {
        //       player: 'Dinesh',
        //       runs: 80
        //     },
        //     {
        //       player: 'Ashwin',
        //       runs: 40
        //     },
        //     {
        //       player: 'karthik',
        //       runs: 35
        //     },
        //     {
        //       player: 'Sara',
        //       runs: 50
        //     },
        //     {
        //       player: 'Saktheesh',
        //       runs: 30
        //     },
        //     {
        //       player: 'Pramod',
        //       runs: 35
        //     },
        //     {
        //       player: 'Darvin',
        //       runs: 0
        //     }
        //   ],
        //   3: [
        //     {
        //       player: 'Dinesh',
        //       runs: 120
        //     },
        //     {
        //       player: 'Ashwin',
        //       runs: 80
        //     },
        //     {
        //       player: 'karthik',
        //       runs: 85
        //     },
        //     {
        //       player: 'Sara',
        //       runs: 55
        //     },
        //     {
        //       player: 'Saktheesh',
        //       runs: 50
        //     },
        //     {
        //       player: 'Pramod',
        //       runs: 40
        //     },
        //     {
        //       player: 'Darvin',
        //       runs: 5
        //     },
        //   ],
        //   4: [
        //     {
        //       player: 'Dinesh',
        //       runs: 130
        //     },
        //     {
        //       player: 'Ashwin',
        //       runs: 90
        //     },
        //     {
        //       player: 'karthik',
        //       runs: 100
        //     },
        //     {
        //       player: 'Sara',
        //       runs: 110
        //     },
        //     {
        //       player: 'Saktheesh',
        //       runs: 80
        //     },
        //     {
        //       player: 'Pramod',
        //       runs: 60
        //     },
        //     {
        //       player: 'Darvin',
        //       runs: 20
        //     }
        //   ],
        //   5: [
        //     {
        //       player: 'Dinesh',
        //       runs: 200
        //     },
        //     {
        //       player: 'Ashwin',
        //       runs: 120
        //     },
        //     {
        //       player: 'karthik',
        //       runs: 150
        //     },
        //     {
        //       player: 'Sara',
        //       runs: 160
        //     },
        //     {
        //       player: 'Saktheesh',
        //       runs: 130
        //     },
        //     {
        //       player: 'Pramod',
        //       runs: 100
        //     },
        //     {
        //       player: 'Darvin',
        //       runs: 50
        //     }
        //   ]
        // };
        const allData = this.chartData;
        this.chartObj.data = JSON.parse(JSON.stringify(allData[matchNo]));
        this.chartObj.invalidateRawData();
        categoryAxis.zoom({start: 0, end: 1 / this.chartObj.data.length});

        series.events.on('inited', () => {
          setTimeout(() => {
            playButton.isActive = true; // this starts interval
          }, 2000);
        });
      });
    }
  }
  dismissModal() {
    this.modalController.dismiss();
  }
  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      this.chartData = null;
      if (this.intervalObj) {
        clearInterval(this.intervalObj);
      }
      if (this.chartObj) {
        this.chartObj.dispose();
      }
    });
  }
}
