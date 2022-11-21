<template>
  <v-dialog
    class="timeseries-dialog"
    v-model="showDialog"
    max-width="1600"
  >
    <v-card>
      <v-btn
        class="timeseries-dialog__close"
        icon
        large
        title="Sluit modal"
        @click="onClick"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title class="headline mb-2">
        Timeseries voor [ID]
      </v-card-title>
      <v-card-text>
      <area-chart />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  import AreaChart from '@/components/area-chart/area-chart';

  export default {
    components: {
      AreaChart,
    },
    computed: {
      ...mapGetters('locations', [ 'timeseries', 'timeseriesModalOpen' ]),
      showDialog() {
        return this.timeseries.length > 0 && this.timeseriesModalOpen;
      },
    },
    methods: {
      ...mapActions('locations', [ 'setTimeseriesModalOpen' ]),
      onClick() {
        this.setTimeseriesModalOpen({ open: false });
      },
    },
  };
</script>

<style src="./timeseries-dialog.css"></style>
