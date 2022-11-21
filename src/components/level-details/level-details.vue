<template>
  <div class="level-details">
    <h3 class="text-h6">Details peilfilter {{ activeLevel.id }}</h3>

    <v-simple-table>
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Naam</td>
            <td>{{ activeLevel.id }}</td>
          </tr>
          <tr>
            <td>Begindatum</td>
            <td>[DATE]</td>
          </tr>
          <tr>
            <td>Einddatum</td>
            <td>[DATE]</td>
          </tr>
          <tr>
            <td>Aquifer</td>
            <td>Deklaag</td>
          </tr>
          <tr>
            <td>Aquifer bepaald op datum</td>
            <td>[DATE]</td>
          </tr>
          <tr>
            <td>Bovenkant filter m (NAP)</td>
            <td>-0.76</td>
          </tr>
          <tr>
            <td>Onderkant filter m (NAP)</td>
            <td>-1.76</td>
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
      ...mapGetters('locations', [ 'activeLevel' ]),
    },
  };
</script>
