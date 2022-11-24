<template>
  <div class="details d-flex flex-row">
    <div class="details__column">
      <location-details />
      <v-divider class="my-8" />
      <level-details />
    </div>

    <div class="details__column">
      <area-chart v-if="showChart" />
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  import AreaChart from '@/components/area-chart/area-chart';
  import LevelDetails from '@/components/level-details/level-details';
  import LocationDetails from '@/components/location-details/location-details';

  export default {
    components: {
      AreaChart,
      LevelDetails,
      LocationDetails,
    },
    created() {
      this.getLocations();
    },
    computed: {
      ...mapGetters('level', [ 'timeseries' ]),
      ...mapGetters('locations', [ 'activeLocation' ]),
      showChart() {
        return this.timeseries.length > 0;
      },
    },
    methods: {
      ...mapActions('locations', [ 'getLocations', 'setTimeseriesModalOpen' ]),
      onClick() {
        this.setTimeseriesModalOpen({ open: true });
      },
    },
  };
</script>

<style>
  .details {
    height: 100%;
    overflow: hidden;
    padding: 24px 0;
    gap: 24px;
  }

  .details__column {
    display: inline-block;
    height: 100%;
    overflow: auto;
    padding: 0 24px;
  }

  .details__column:first-child {
    flex: 0 0 600px;
  }

  .details__column:last-child {
    flex: 1 1 auto;
  }
</style>
