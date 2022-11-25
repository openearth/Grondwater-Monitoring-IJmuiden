<template>
  <div class="location-details">
    <v-simple-table v-if="activeLocation">
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Naam</td>
            <td>{{ id }}</td>
          </tr>
          <tr>
            <td>Coördinaten</td>
            <td>Lng: {{ coordinates[0] }} - Lat: {{ coordinates[1] }}</td>
          </tr>
          <tr>
            <td>Gemiddelde</td>
            <td>{{ meanhead }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="location-details__images" v-if="images.length">
      <a
        v-for="image in images"
        :key="image"
        :href="image"
        target="_blank"
        title="Open afbeelding in nieuw tabblad"
      >
        <v-img
          :lazy-src="image"
          max-width="260"
          :src="image"
          alt=""
        />
      </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  import getLocationImages from '@/lib/get-location-images';

  export default {
    data() {
      return {
        images: [],
      };
    },
    computed: {
      ...mapGetters('locations', [ 'activeLocation' ]),
      id() {
        return this.activeLocation.properties.loc_id;
      },
      coordinates() {
        return this.activeLocation.geometry.coordinates;
      },
      meanhead() {
        return this.activeLocation.properties.meanhead;
      },
    },
    watch: {
      activeLocation(location) {
        if (location) {
          getLocationImages({ id: location.properties.loc_id })
            .then((images) => this.images = images);
        }
      },
    },
  };
</script>

<style src="./location-details.css"></style>
