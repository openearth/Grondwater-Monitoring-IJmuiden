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
  import { mapActions, mapGetters } from 'vuex';
  import { MglMap, MglNavigationControl } from 'vue-mapbox';
  import Mapbox from 'mapbox-gl';
  import { featureCollection } from '@turf/helpers';
  import bbox from '@turf/bbox';

  export default {
    components: {
      MglMap,
      MglNavigationControl,
    },
    data() {
      return {
        mapCenter: [ 4.604, 52.467 ],
        mapLoaded: false,
        mapToken: process.env.VUE_APP_MAPBOX_TOKEN,
        mapZoom: 12.5,
        shouldZoomIn: false,
        popup: null,
      };
    },
    created() {
      this.mapbox = Mapbox;
      this.popup = new Mapbox.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 10,
      });
    },
    computed: {
      ...mapGetters('locations', [ 'locations' ]),
    },
    methods: {
      ...mapActions('locations', [ 'setActiveLocation' ]),
      addListeners() {
        this.$root.map.on('mouseenter', 'markers', this.onMouseEnter);
        this.$root.map.on('mouseleave', 'markers', this.onMouseLeave);
      },
      onMapCreated({ map }) {
        this.$root.map = map;
        this.mapLoaded = true;
        this.shouldZoomIn = true;
      },
      onClickMarker(id) {
        this.setActiveLocation({ id });
      },
      onMouseEnter(event) {
        const { features, lngLat } = event;
        const coordinates = features[0].geometry.coordinates.slice();
        const { loc_id, meanhead } = features[0].properties;
        const content = `<dl>
          <dt class="text-subtitle-2">Locatie id:</dt> <dd class="text-body-2">${ loc_id }</dd>
          <dt class="text-subtitle-2">Gem. gwstand:</dt> <dd class="text-body-2">${ meanhead }</dd>
        </dl>`;

        // Change the cursor style as a UI indicator.
        this.$root.map.getCanvas().style.cursor = 'pointer';

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        this.popup
          .setLngLat(coordinates)
          .setHTML(content)
          .addTo(this.$root.map);
      },
      onMouseLeave() {
        this.$root.map.getCanvas().style.cursor = '';
        this.popup.remove();
      },
      populateMap() {
        this.$root.map.addSource('markers', {
          type: 'geojson',
          data: featureCollection(
            this.locations.map((location) => ({
              geometry: location.geometry,
              properties: location.properties,
              type: 'Feature',
            }))
          ),
        });

        // Add a layer showing the places.
        this.$root.map.addLayer({
          id: 'markers',
          type: 'circle',
          source: 'markers',
          paint: {
            'circle-color': '#fff',
            'circle-radius': 5,
            'circle-stroke-width': 5,
            'circle-stroke-color': '#ff0000',
          },
        });
      },
      removeListeners() {
        this.$root.map.off('mouseenter', 'markers', this.onMouseEnter);
        this.$root.map.off('mouseleave', 'markers', this.onMouseLeave);
      },
    },
    watch: {
      mapLoaded(isLoaded) {
        if (isLoaded) {
          this.populateMap();
          this.addListeners();
        }
      },
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
