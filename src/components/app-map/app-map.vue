<template>
  <div class="app-map">
    <mgl-map
      mapStyle="mapbox://styles/mapbox/streets-v11"
      :accessToken="mapToken"
      :center="mapCenter"
      :zoom="mapZoom"
      @load="onMapCreated"
    >
      <!-- Controls -->
      <mgl-navigation-control position="bottom-right" />
    </mgl-map>
  </div>
</template>

<script>
  import { MglMap, MglNavigationControl } from 'vue-mapbox';
  import Mapbox from 'mapbox-gl';

  export default {
    components: {
      MglMap,
      MglNavigationControl,
    },
    data() {
      return {
        mapCenter: [ 4.5989, 52.4655 ],
        mapToken: process.env.VUE_APP_MAPBOX_TOKEN,
        mapZoom: 15.5,
      };
    },
    created() {
      this.mapbox = Mapbox;
    },
    methods: {
      onMapCreated({ map }) {
        this.$root.map = map;
      },
    },
  };
</script>

<style src="./app-map.css"></style>
