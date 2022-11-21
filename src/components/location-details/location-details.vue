<template>
  <div class="location-details">
    <h3 class="text-h6">Details meetlocatie</h3>

    <v-simple-table>
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
          <tr>
            <td>Boorgatmeting (foto)</td>
            <td>
              <a :href="boreholePhoto" target="_blank">{{ id }}.png</a>
              <v-icon small>mdi-open-in-new</v-icon>
            </td>
          </tr>
          <tr>
            <td>Boorgatmeting (foto)</td>
            <td>
              <a :href="locationPhoto" target="_blank">{{ id }}.jpg</a>
              <v-icon small>mdi-open-in-new</v-icon>
            </td>
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
      boreholePhoto() {
        const path = 'https://grondwater-ijmuiden.openearth.nl/static/boorgatmeting';
        return `${ path }/${ this.id }.png`;
      },
      locationPhoto() {
        const path = 'https://grondwater-ijmuiden.openearth.nl/static/fotos';
        return `${ path }/${ this.id }.jpg`;
      },
      meanhead() {
        return this.activeLocation.properties.meanhead;
      },
    },
  };
</script>
