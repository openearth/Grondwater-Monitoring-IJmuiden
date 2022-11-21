<template>
  <div class="pa-4 d-flex flex-column">
    <location-details v-if="activeLocation" />
    <level-select v-if="activeLocation" />
    <level-details v-if="activeLevel" />

    <v-divider v-if="timeseries.length" class="my-8" />
    <v-btn
      v-if="timeseries.length"
      color="primary"
      depressed
      @click="onClick"
    >
      Bekijk timeseries
    </v-btn>

    <v-alert
      v-if="!activeLocation && !activeLevel"
      dense
      outlined
      type="info"
    >
      Selecteer een punt op de kaart voor meer informatie.
    </v-alert>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  import LevelDetails from '@/components/level-details/level-details';
  import LevelSelect from '@/components/level-select/level-select';
  import LocationDetails from '@/components/location-details/location-details';

  export default {
    components: {
      LevelDetails,
      LevelSelect,
      LocationDetails,
    },
    created() {
      this.getLocations();
    },
    computed: {
      ...mapGetters('locations', [ 'activeLevel', 'activeLocation', 'timeseries' ]),
    },
    methods: {
      ...mapActions('locations', [ 'getLocations', 'setTimeseriesModalOpen' ]),
      onClick() {
        this.setTimeseriesModalOpen({ open: true });
      },
    },
  };
</script>
