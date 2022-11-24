<template>
  <app-chart class="area-chart">
    <h3 class="text-h6">
      Timeseries voor {{ activeLevel.locationid }}
    </h3>
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

  import { DataZoomComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';

  use([
    CanvasRenderer,
    DataZoomComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    TooltipComponent,
  ]);

  import AppChart from '@/components/app-chart/app-chart';

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
      ...mapGetters('level', [ 'activeLevel', 'timeseries' ]),
      baseOptions() {
        return {
          dataZoom: [
            {
              type: 'inside',
              start: 0,
              end: 100,
            },
            {
              start: 0,
              end: 100,
            },
          ],
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            top: '10px',
            right: '10px',
            bottom: '70px',
            left: '10px',
            containLabel: true,
            backgroundColor: '#fff',
          },
        };
      },
      dates() {
        return this.timeseries.map((item) => item.date);
      },
      values() {
        return this.timeseries.map((item) => item.head);
      },
      xAxis() {
        return {
          type: 'category',
          data: this.dates,
        };
      },
      yAxis() {
        return {
          boundaryGap: [ 0, '100%' ],
          name: 'Grondwaterstand cm + NAP',
          max: 1,
          type: 'value',
        };
      },
      options() {
        return {
          ...this.baseOptions,
          series: this.series,
          xAxis: this.xAxis,
          yAxis: this.yAxis,
        };
      },
      series() {
        return [
          {
            areaStyle: {
              color: 'rgba(0, 143, 197, 0.3)',
            },
            data: this.values,
            itemStyle: {
              color: '#008fc5',
            },
            name: 'Grondwaterstand cm + NAP',
            sampling: 'lttb',
            type: 'line',
          },
        ];
      },
    },
  };
</script>
