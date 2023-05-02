<template>
  <div class="details d-flex flex-row">
    <div class="details__column">
      <h3 class="text-h6">
        Details meetlocatie
      </h3>
      <location-details />
      <v-divider class="my-8" />
      <level-details />
    </div>

    <div class="details__column" style="margin-top: 30px">
          <v-card>
      <v-tabs
        background-color="primary"
        center-active
        dark
      >
        <v-tab>Grondwaterstand</v-tab>
        <v-tab>Geologie</v-tab>
        <v-tab>Veldmeting</v-tab>

      <v-tab-item style="margin: 10px">
        <h3 v-if="!activeLevel" class="text-h6">
          Er is geen peilfilter geselecteerd, kies 'Selecteer peilfilter op deze meetlocatie' <br>
          <v-icon color="black" size="48">mdi-arrow-bottom-left</v-icon>
        </h3>
        <h3 v-if="activeLevel" class="text-h6">
          Tijdreeks voor {{ id }}
        </h3>
      <area-chart v-if="showChart" />
      </v-tab-item>

      <v-tab-item style="margin: 10px">
        <h3 v-if="!activeLevel" class="text-h6">
          Er is geen peilfilter geselecteerd, kies 'Selecteer peilfilter op deze meetlocatie' <br>
          <v-icon color="black" size="48">mdi-arrow-bottom-left</v-icon>
        </h3>
        <h3 v-if="activeLevel" class="text-h6">
          Foto's van  {{ id }}
        </h3>
      </v-tab-item>

      <v-tab-item style="margin: 10px">
        <h3 v-if="!activeLevel" class="text-h6">
          Er is geen peilfilter geselecteerd, kies 'Selecteer peilfilter op deze meetlocatie' <br>
          <v-icon color="black" size="48">mdi-arrow-bottom-left</v-icon>
        </h3>
        <h3 v-if="activeLevel" class="text-h6">
          Informatie van  {{ id }}
        </h3>
      </v-tab-item>

      </v-tabs>
    </v-card>

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
      ...mapGetters('level', [ 'activeLevel', 'timeseries' ]),
      id() {
        return this.activeLevel.properties.locationid;
      },
      showChart() {
        return this.activeLevel && this.timeseries.length > 0;
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

<style src="./map.css"></style>
