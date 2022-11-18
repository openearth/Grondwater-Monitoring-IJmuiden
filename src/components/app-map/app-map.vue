<template>
  <div class="app-map">
    <v-mapbox
      map-style="mapbox://styles/mapbox/streets-v11"
      :access-token="mapToken"
      :center="mapCenter"
      :zoom="mapZoom"
    >
      <!-- Controls -->
      <v-mapbox-navigation-control />

      <!-- Layers -->
      <locations-layer />
    </v-mapbox>
  </div>
</template>

<script>
  import LocationsLayer from '@/components/locations-layer/locations-layer';

  export default {
    components: { LocationsLayer },
    data() {
      return {
        mapCenter: [ 4.604, 52.467 ],
        mapLoaded: false,
        mapToken: process.env.VUE_APP_MAPBOX_TOKEN,
        mapZoom: 12.5,
      };
    },
  };
</script>

<style src="./app-map.css"></style>
