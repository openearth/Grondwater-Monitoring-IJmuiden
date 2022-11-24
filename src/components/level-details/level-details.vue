<template>
  <div class="level-details">
    <h3 class="level-details__title text-h6">Details peilfilter</h3>

    <v-select
      v-if="activeLocation"
      v-model="selectedLevel"
      label="Selecteer peilfilter op deze meetlocatie"
      :items="levels"
      @change="onChange"
    />

    <v-simple-table v-if="activeLevel">
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Naam</td>
            <td>{{ activeLevel.locationid }}</td>
          </tr>
          <tr>
            <td>bot_filter</td>
            <td>{{ activeLevel.bot_filter }}</td>
          </tr>
          <tr>
            <td>cable_length</td>
            <td>{{ activeLevel.cable_length }}</td>
          </tr>
          <tr>
            <td>crs</td>
            <td>{{ activeLevel.crs }}</td>
          </tr>
          <tr>
            <td>top_filter</td>
            <td>{{ activeLevel.top_filter }}</td>
          </tr>
          <tr>
            <td>Coördinaten</td>
            <td>x: {{ activeLevel.xcoord }} - y: {{ activeLevel.ycoord }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-divider class="my-8" />

    <h3 v-if="activeLevel" class="level-details__title text-h6">
      Details metingen {{ activeLevel.locationid }}
    </h3>

    <v-simple-table v-if="activeLevel">
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Min gws m (NAP)</td>
            <td>[VALUE]</td>
          </tr>
          <tr>
            <td>Max gws m (NAP)</td>
            <td>[VALUE]</td>
          </tr>
          <tr>
            <td>Gemiddelde gws m (NAP)</td>
            <td>[VALUE]</td>
          </tr>
          <tr>
            <td>Aantal metingen</td>
            <td>[VALUE]</td>
          </tr>
          <tr>
            <td>Meest recente gws m (NAP)</td>
            <td>[VALUE]</td>
          </tr>
          <tr>
            <td>Meest recente gws datumtijd</td>
            <td>[DATE]</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        selectedLevel: null,
      };
    },
    computed: {
      ...mapGetters('level', [ 'activeLevel' ]),
      ...mapGetters('locations', [ 'activeLocation' ]),
      levels() {
        const { filters, loc_id } = this.activeLocation.properties;
        const splitFilters = filters.split(',');

        return splitFilters.map((filter) => ({
          text: `${ loc_id }_${ filter }`,
          value: `${ loc_id }_${ filter }`,
        }));
      },
    },
    methods: {
      ...mapActions('level', [ 'getLevel' ]),
      onChange() {
        this.getLevel({ id: this.selectedLevel });
      },
    },
  };
</script>

<style src="./level-details.css"></style>
