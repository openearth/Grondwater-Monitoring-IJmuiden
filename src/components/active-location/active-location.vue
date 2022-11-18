<template>
  <div class="active-location">
    <h3 class="text-h6">Over deze locatie</h3>

    <v-divider class="mt-8 mb-1" />

    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="blue">mdi-identifier</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ activeLocation.properties.loc_id }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset />

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="blue">mdi-map-marker</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Lng: {{ activeLocation.geometry.coordinates[0] }} - Lat: {{ activeLocation.geometry.coordinates[1] }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset />

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="blue">mdi-crosshairs</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Meanhead: {{ activeLocation.properties.meanhead }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mt-1 mb-8" />

    <p class="text-body-1">
      Sed fringilla dolor at tortor consectetur tristique.
      Suspendisse libero mauris, tristique in nulla eget, placerat vulputate augue.
      Nunc elementum nibh lobortis libero sollicitudin lacinia.
      Suspendisse molestie non nibh et aliquet. Phasellus commodo sodales dolor nec commodo.
      Nunc finibus feugiat diam nec dictum. Vestibulum ante ipsum primis in faucibus
      orci luctus et ultrices posuere cubilia curae; Suspendisse ornare pretium turpis,
      quis hendrerit magna fermentum sed.
    </p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters('locations', [ 'activeLocation' ]),
    },
  };
</script>
