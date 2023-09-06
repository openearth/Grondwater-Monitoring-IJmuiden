<template>
  <v-dialog
    v-model="showImagesDialog"
    width="auto"
    scrollable
    persistent
  >
  <v-card>
    <v-card-text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, ratione unde labore enim harum vitae a assumenda, modi adipisci fuga culpa perferendis odit, magnam quae soluta fugit. Reiciendis, incidunt ipsam.
    </v-card-text>
    <v-btn color="primary" @click="closeImagesDialog">Close</v-btn>
  </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      showImagesDialog: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      closeImagesDialog() {
        this.showImagesDialog = false;
      },
    },
  };
</script>
