<template>
  <div class="level-details">
    <v-select
      v-if="activeLocation"
      v-model="selectedLevel"
      label="Selecteer peilfilter op deze meetlocatie"
      :items="levels"
      @change="onChange"
    />

    <v-divider v-if="activeLevel" class="my-8" />

    <h3 v-if="activeLevel" class="level-details__title text-h6">
      Details peilfilter {{ id }}
    </h3>

    <v-simple-table v-if="activeLevel">
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Naam</td>
            <td>{{ id }}</td>
          </tr>
          <tr>
            <td>Coördinaten</td>
            <td>x: {{ xcoord }} - y: {{ ycoord }}</td>
          </tr>
          <tr>
            <td>CRS</td>
            <td>{{ crs }}</td>
          </tr>
          <tr>
            <td>Kabellengte</td>
            <td>{{ cableLength }}m</td>
          </tr>
          <tr>
            <td>Bovenkant filter (NAP)</td>
            <td>{{ filterTop }}m</td>
          </tr>
          <tr>
            <td>Onderkant filter (NAP)</td>
            <td>{{ filterBottom }}m</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-divider v-if="activeLevel" class="my-8" />

    <h3 v-if="activeLevel" class="level-details__title text-h6">
      Details metingen {{ id }}
    </h3>

    <v-simple-table v-if="activeLevel">
      <template v-slot:default>
        <tbody>
          <tr>
            <td>Min gws (NAP)</td>
            <td>{{ min }}m</td>
          </tr>
          <tr>
            <td>Max gws (NAP)</td>
            <td>{{ max }}m</td>
          </tr>
          <tr>
            <td>Gemiddelde gws (NAP)</td>
            <td>{{ mean }}m</td>
          </tr>
          <tr>
            <td>Aantal metingen</td>
            <td>{{ measurements }}</td>
          </tr>
          <tr>
            <td>Meest recente gws (NAP)</td>
            <td>[VALUE]m</td>
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
      cableLength() {
        return this.activeLevel.properties.cable_length;
      },
      crs() {
        return this.activeLevel.properties.crs;
      },
      filterTop() {
        return this.activeLevel.properties.top_filter;
      },
      filterBottom() {
        return this.activeLevel.properties.bot_filter;
      },
      id() {
        return this.activeLevel.properties.locationid;
      },
      levels() {
        const { filters, loc_id } = this.activeLocation.properties;
        const splitFilters = filters.split(',');

        return splitFilters.map((filter) => ({
          text: `${ loc_id }_${ filter }`,
          value: `${ loc_id }_${ filter }`,
        }));
      },
      max() {
        return this.activeLevel.statistics.maxgw;
      },
      mean() {
        return this.activeLevel.statistics.meangw;
      },
      measurements() {
        return this.activeLevel.statistics.nobs;
      },
      min() {
        return this.activeLevel.statistics.mingw;
      },
      xcoord () {
        return this.activeLevel.properties.xcoord;
      },
      ycoord () {
        return this.activeLevel.properties.ycoord;
      },
    },
    methods: {
      ...mapActions('level', [ 'getLevel' ]),
      ...mapActions('ph', [ 'getPh' ]),
      ...mapActions('ec', [ 'getEc' ]),
      ...mapActions('redox', [ 'getRedox' ]),
      onChange() {
        this.getLevel({ id: this.selectedLevel });
        this.getPh({ id: this.selectedLevel });
        this.getEc({ id: this.selectedLevel });
        this.getRedox({ id: this.selectedLevel });
      },
    },
  };
</script>

<style src="./level-details.css"></style>
