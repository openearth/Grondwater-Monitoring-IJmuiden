<template>
  <app-chart class="area-chart">
    <h3 class="text-h6">Timeseries at [ID]</h3>
    <v-chart
      class="scatter-chart"
      :init-options="initOptions"
      :option="options"
    />
  </app-chart>
</template>

<script>
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LineChart } from 'echarts/charts';
  import VChart from 'vue-echarts';

  import {
    DataZoomComponent,
    GridComponent,
    LegendComponent,
    // TitleComponent,
    // ToolboxComponent,
    TooltipComponent,
  } from 'echarts/components';

  use([
    CanvasRenderer,
    DataZoomComponent,
    GridComponent,
    LineChart,
    LegendComponent,
    // TitleComponent,
    // ToolboxComponent,
    TooltipComponent,
  ]);

  import AppChart from '@/components/app-chart/app-chart';

  let base = +new Date(1968, 9, 3);
  const oneDay = 24 * 3600 * 1000;
  const dates = [];
  const data = [ Math.random() * 300 ];

  for (let i = 1; i < 2000; i++) {
    let now = new Date((base += oneDay));
    dates.push([ now.getFullYear(), now.getMonth() + 1, now.getDate() ].join('/'));
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
  }

  export default {
    components: {
      AppChart,
      VChart,
    },
    data() {
      return {
        initOptions: { height: '600px', width:'452px' },
      };
    },
    computed: {
      baseOptions() {
        return {
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 10,
            },
            {
              start: 0,
              end: 10,
            },
          ],
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [ pt[0], '10%' ];
            },
          },
          // title: {
          //   left: 'center',
          //   text: 'Large Area Chart',
          // },
          // toolbox: {
          //   feature: {
          //     dataZoom: {
          //       yAxisIndex: 'none',
          //     },
          //     restore: {},
          //     saveAsImage: {},
          //   },
          // },
        };
      },
      fakeData() {
        return data;
      },
      xAxis() {
        return {
          type: 'category',
          boundaryGap: false,
          data: dates,
        };
      },
      yAxis() {
        return {
          type: 'value',
          boundaryGap: [ 0, '100%' ],
        };
      },
      options() {
        return {
          ...this.baseOptions,
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          series: this.series,
        };
      },
      series() {
        return [
          {
            name: 'Data',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(0, 0, 0)',
            },
            areaStyle: {
              color: 'red',
            },
            data: this.fakeData,
          },
        ];
      },
    },
  };
</script>
