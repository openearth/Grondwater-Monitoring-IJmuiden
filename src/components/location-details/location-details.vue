<template>
  <div class="location-details">
    <h3 class="text-h6">Details meetlocatie</h3>

    <v-simple-table>
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Naam</td>
            <td>{{ activeLocation.properties.loc_id }}</td>
          </tr>
          <tr>
            <td>Coördinaten</td>
            <td>Lng: {{ activeLocation.geometry.coordinates[0] }} - Lat: {{ activeLocation.geometry.coordinates[1] }}</td>
          </tr>
          <tr>
            <td>Gemiddelde</td>
            <td>{{ activeLocation.properties.meanhead }}</td>
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
    },
  };
</script>
