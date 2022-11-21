<script>
  import { mapActions, mapGetters } from 'vuex';
  import Mapbox from 'mapbox-gl';
  import { featureCollection } from '@turf/helpers';
  import bbox from '@turf/bbox';

  // Docs: https://docs.mapbox.com/help/glossary/layout-paint-property/
  const MARKER_STYLES = {
    'circle-color': '#fff',
    'circle-radius': 5,
    'circle-stroke-width': 5,
    'circle-stroke-color': '#ff0000',
  };

  export default {
    name: 'locations-layer',
    render() {
      return this.$slots.default;
    },
    data() {
      return {
        map: null,
        mapLoaded: false,
        popup: null,
        shouldZoomIn: false,
      };
    },
    created() {
      this.mapbox = Mapbox;
      this.popup = new Mapbox.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 14,
      });
    },
    computed: {
      ...mapGetters('locations', [ 'locations' ]),
    },
    methods: {
      ...mapActions('locations', [ 'setActiveLocation', 'setTimeseries' ]),
      addListeners() {
        this.map.on('click', 'markers', this.onClickMarker);
        this.map.on('mouseenter', 'markers', this.onMouseEnter);
        this.map.on('mouseleave', 'markers', this.onMouseLeave);
      },
      deferredMountedTo(map) {
        this.map = map;
        this.mapLoaded = true;
        this.shouldZoomIn = true;
      },
      onClickMarker(event) {
        const { loc_id } = event.features[0].properties;
        this.setActiveLocation({ id: loc_id });
        this.setTimeseries({ id: loc_id });
      },
      onMouseEnter(event) {
        const { features, lngLat } = event;
        const coordinates = features[0].geometry.coordinates.slice();
        const { loc_id, meanhead } = features[0].properties;
        const content = `<dl>
          <dt class="text-subtitle-2">Locatie id:</dt>
          <dd class="text-body-2">${ loc_id }</dd>
          <dt class="text-subtitle-2">Gem. gwstand:</dt>
          <dd class="text-body-2">${ meanhead }</dd>
        </dl>`;

        // Change the cursor style as a UI indicator.
        this.map.getCanvas().style.cursor = 'pointer';

        // Ensure that if the map is zoomed out such that multiple copies of the
        // feature are visible, the popup appears over the copy being pointed to.
        while (Math.abs(lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates based on the feature found.
        this.popup
          .setLngLat(coordinates)
          .setHTML(content)
          .addTo(this.map);
      },
      onMouseLeave() {
        this.map.getCanvas().style.cursor = '';
        this.popup.remove();
      },
      populateMap() {
        this.map.addSource('markers', {
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
        this.map.addLayer({
          id: 'markers',
          type: 'circle',
          source: 'markers',
          paint: MARKER_STYLES,
        });
      },
      removeListeners() {
        this.map.off('click', 'markers', this.onClickMarker);
        this.map.off('mouseenter', 'markers', this.onMouseEnter);
        this.map.off('mouseleave', 'markers', this.onMouseLeave);
      },
    },
    watch: {
      mapLoaded(isLoaded) {
        if (isLoaded) {
          this.addListeners();
          this.populateMap();
        }
      },
      shouldZoomIn(shouldZoom) {
        if (this.locations.length && shouldZoom) {
          const bounds = bbox(featureCollection(
            this.locations.map(({ geometry }) => ({
              type: 'Feature', geometry,
            }))
          ));

          this.map.fitBounds(bounds, { padding: 100 });
          this.shouldZoomIn = false;
        }
      },
    },
  };
</script>
