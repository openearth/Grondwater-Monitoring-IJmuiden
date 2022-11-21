<template>
  <div class="pa-4 d-flex flex-column">
    <location-details v-if="activeLocation" />
    <level-select v-if="activeLocation" />
    <level-details v-if="activeLevel" />
    <area-chart v-if="activeLocation" />
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

  import AreaChart from '@/components/area-chart/area-chart';
  import LevelDetails from '@/components/level-details/level-details';
  import LevelSelect from '@/components/level-select/level-select';
  import LocationDetails from '@/components/location-details/location-details';

  export default {
    components: {
      AreaChart,
      LevelDetails,
      LevelSelect,
      LocationDetails,
    },
    created() {
      this.getLocations();
    },
    computed: {
      ...mapGetters('locations', [ 'activeLevel', 'activeLocation' ]),
    },
    methods: {
      ...mapActions('locations', [ 'getLocations' ]),
    },
  };
</script>
