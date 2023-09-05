<template>
  <v-dialog
    v-model="showDialog"
    width="auto"
  >
  <v-card>
    <v-card-text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, ratione unde labore enim harum vitae a assumenda, modi adipisci fuga culpa perferendis odit, magnam quae soluta fugit. Reiciendis, incidunt ipsam.
    </v-card-text>
  </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: {
      showDialog: {
        type: Boolean,
        default: true,
      },
    },
  };
</script>
