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
    'circle-stroke-color': '#008fc5',
  };

  const SELECTED_MARKER_STYLES = {
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
      ...mapGetters('app', [ 'panelIsCollapsed' ]),
      ...mapGetters('locations', [ 'locations', 'selectedLocation' ]),
    },
    methods: {
      ...mapActions('app', [ 'setPanelIsCollapsed' ]),
      ...mapActions('level', { resetLevel: 'reset' }),
      ...mapActions('ph', { resetPh: 'reset' }),
      ...mapActions('ec', { resetEc: 'reset' }),
      ...mapActions('redox', { resetRedox: 'reset' }),
      ...mapActions('locations', [ 'resetActiveLocation', 'setActiveLocation', 'setSelectedLocation' ]),
      addListeners() {
        this.map.on('click', 'locations', this.onClickMarker);
        this.map.on('mouseenter', 'locations', this.onMouseEnter);
        this.map.on('mouseleave', 'locations', this.onMouseLeave);
      },
      addLocationToMap() {
        const selectedLocation = featureCollection([ {
          type: 'Feature',
          geometry: this.selectedLocation.geometry,
          properties: this.selectedLocation.properties,
        } ]);

        this.map
          .getSource('selected-location')
          .setData(selectedLocation);
      },
      createLocationsSource() {
        this.map.addSource('locations', {
          type: 'geojson',
          data: featureCollection(
            this.locations.map((location) => ({
              geometry: location.geometry,
              properties: location.properties,
              type: 'Feature',
            }))
          ),
        });

        this.map.addLayer({
          id: 'locations',
          type: 'circle',
          source: 'locations',
          paint: MARKER_STYLES,
        });
      },
      createSelectedLocationSource() {
        this.map.addSource('selected-location', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [],
          },
        });

        this.map.addLayer({
          id: 'selected-location',
          type: 'circle',
          source: 'selected-location',
          paint: SELECTED_MARKER_STYLES,
        });
      },
      deferredMountedTo(map) {
        this.map = map;
        this.mapLoaded = true;
        this.zoomToCollection({ padding: 150 });
      },
      onClickMarker(event) {
        const { loc_id } = event.features[0].properties;
        this.resetLevel();
        this.resetPh();
        this.resetEc();
        this.resetRedox();

        this.setActiveLocation({ id: loc_id });
        this.setSelectedLocation({ id: loc_id });
        this.setPanelIsCollapsed({ isCollapsed: false });
      },
      onMouseEnter(event) {
        const { features, lngLat } = event;
        const coordinates = features[0].geometry.coordinates.slice();
        const { loc_id } = features[0].properties;
        const content = `<dl>
          <dt class="text-subtitle-2">Locatie id:</dt>
          <dd class="text-body-2">${ loc_id }</dd>
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
        this.createLocationsSource();
        this.createSelectedLocationSource();
      },
      removeListeners() {
        this.map.off('click', 'locations', this.onClickMarker);
        this.map.off('mouseenter', 'locations', this.onMouseEnter);
        this.map.off('mouseleave', 'locations', this.onMouseLeave);
      },
      zoomToCollection({ padding }) {
        if (!this.locations.length) {
          return;
        }

        const bounds = bbox(featureCollection(
          this.locations.map(({ geometry }) => ({
            type: 'Feature', geometry,
          }))
        ));

        this.map.fitBounds(bounds, { padding });
      },
    },
    watch: {
      mapLoaded(isLoaded) {
        if (isLoaded) {
          this.addListeners();
          this.populateMap();
        }
      },
      panelIsCollapsed(isCollapsed) {
        if (isCollapsed) {
          this.zoomToCollection({ padding: 150 });
        } else {
          const height = this.$root.$el.offsetHeight - 64;
          const bottomOffset = parseInt(height * 0.66, 10);

          this.zoomToCollection({ padding: { top: 50, bottom: bottomOffset, left: 50, right: 50 } });
        }
      },
      selectedLocation(location) {
        if (location) {
          this.addLocationToMap(location);
        }
      },
    },
  };
</script>
