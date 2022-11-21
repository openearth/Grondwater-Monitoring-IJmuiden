<template>
  <app-chart class="area-chart">
    <v-chart
      class="scatter-chart"
      :init-options="initOptions"
      :option="options"
    />
  </app-chart>
</template>

<script>
  import { mapGetters } from 'vuex';
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
        initOptions: { height: '500px' },
      };
    },
    computed: {
      ...mapGetters('locations', [ 'timeseries' ]),
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
      dates() {
        return this.timeseries.map((item) => item.date);
      },
      values() {
        return this.timeseries.map((item) => item.depth);
      },
      xAxis() {
        return {
          type: 'category',
          boundaryGap: false,
          data: this.dates,
        };
      },
      yAxis() {
        return {
          name: 'Grondwaterstand cm + NAP',
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
              color: '#008fc5',
            },
            areaStyle: {
              color: 'rgba(0, 143, 197, 0.3)',
            },
            data: this.values,
          },
        ];
      },
    },
  };
</script>
