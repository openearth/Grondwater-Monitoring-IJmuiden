<template>
  <v-dialog
    v-model="showImagesDialog"
    max-width="850"
    scrollable
    persistent
  >
  <v-card>
    <v-card-title class="text-h5 grey lighten-2">
      Kaarten en figuren
    </v-card-title>

    <v-card-text>
    <img
    src="https://grondwater-ijmuiden.openearth.nl/static/maps_figures/map_mean_fresh_water_head.png"
    width="780">
    <br>
    <br>
    <br>
    <img
    src="https://grondwater-ijmuiden.openearth.nl/static/maps_figures/map_Chloride.png"
    width="780">
    <br>
    <br>
    <br>
    <img
    src="https://grondwater-ijmuiden.openearth.nl/static/maps_figures/map_electrical_conductivity.png"
    width="780">
    <br>
    <br>
    <br>
    <div style="text-align:center">
      <b>Verzilting-index</b>
    </div>
    <img
    src="https://grondwater-ijmuiden.openearth.nl/static/maps_figures/figure_bex-index.png"
    width="780">
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="closeImagesDialog"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-dialog>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters('app', [ 'showImagesDialog' ]),
    },
    methods: {
      ...mapMutations({
        hideImagesDialog: 'app/HIDE_IMAGE_DIALOG',
      }),
      closeImagesDialog() {
        this.hideImagesDialog();
      },
    },
  };
</script>
