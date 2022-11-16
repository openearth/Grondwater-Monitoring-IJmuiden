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

      <!-- Markers -->
      <template v-if="locations.length">
        <mgl-marker
          v-for="({ geometry, properties }) in locations"
          :key="properties.loc_id"
          :coordinates="geometry.coordinates"
          color="red"
        >
          <mgl-popup :offset="[ 0, -23 ]">
            <div>
              <h3 class="text-subtitle-2">{{ properties.loc_id }}</h3>
              <p class="text-body-2">meanhead: {{ properties.meanhead }}</p>
            </div>
          </mgl-popup>
        </mgl-marker>

      </template>
    </mgl-map>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { MglMap, MglMarker, MglNavigationControl, MglPopup } from 'vue-mapbox';
  import Mapbox from 'mapbox-gl';
  import { featureCollection } from '@turf/helpers';
  import bbox from '@turf/bbox';

  export default {
    components: {
      MglMap,
      MglMarker,
      MglNavigationControl,
      MglPopup,
    },
    data() {
      return {
        mapCenter: [ 4.604, 52.467 ],
        mapToken: process.env.VUE_APP_MAPBOX_TOKEN,
        mapZoom: 12.5,
        shouldZoomIn: false,
      };
    },
    created() {
      this.mapbox = Mapbox;
    },
    computed: {
      ...mapGetters('locations', [ 'locations' ]),
    },
    methods: {
      onMapCreated({ map }) {
        this.$root.map = map;
        this.shouldZoomIn = true;
      },
    },
    watch: {
      shouldZoomIn(shouldZoom) {
        if (this.locations.length && shouldZoom) {
          const bounds = bbox(featureCollection(
            this.locations.map((location) => ({
              geometry: location.geometry,
              type: 'Feature',
            }))
          ));

          this.$root.map.fitBounds(bounds, { padding: 100 });
          this.shouldZoomIn = false;
        }
      },
    },
  };
</script>

<style src="./app-map.css"></style>
