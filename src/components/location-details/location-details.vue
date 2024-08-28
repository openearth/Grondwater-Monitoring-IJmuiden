<template>
  <div>
    <v-simple-table v-if="activeLocation">
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Naam</td>
            <td>{{ id }}</td>
          </tr>
          <tr>
            <td>Coördinaten (EPSG:28992)</td>
            <td>x: {{ coordinates_rd[0] }} - y: {{ coordinates_rd[1] }}</td>
          </tr>
          <tr>
            <td colspan="2" class="pt-3">{{ location_description }}</td>
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
        console.log('this.activeLocation', this.activeLocation);
        return this.activeLocation.properties.loc_id;
      },
      coordinates_rd() {
        return this.activeLocation.geometry_rd.coordinates;
      },
      location_description() {
        return this.activeLocation.properties.description;
      },
    },
  };
</script>

<style></style>
