<template>
  <div class="location-details">
    <h3 class="location-details__title text-h6">Details meetlocatie</h3>

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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
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
  };
</script>

<style src="./location-details.css"></style>
