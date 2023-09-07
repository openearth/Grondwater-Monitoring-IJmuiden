<template>
  <v-app>
    <v-app-bar
      class="app-header"
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        <router-link
          :to="{ name: 'home' }"
          class="white--text text-decoration-none"
        >
          Grondwater Monitoring IJmuiden
        </router-link>
      </v-toolbar-title>

      <v-tabs
      right
      style="width: auto"
      class="mr-15">
        <v-menu
        style="align:center"
        v-model="menuOpen"
        :close-on-content-click="false"
        offset-y>
          <template v-slot:activator="{ on }">
            <v-tab v-on="on">
              Bevindingen
            </v-tab>
          </template>
          <v-list>
            <v-list-item @click="openDialog"> Kaarten en figuren</v-list-item>
            <images-dialog v-if="showImagesDialog" />
            <v-list-item @click="openReport">Rapportages</v-list-item>
          </v-list>
        </v-menu>
      </v-tabs>

    </v-app-bar>

    <v-main class="app-main">
      <app-map />
      <app-panel />
    </v-main>

    <welcome-dialog />

    <toast-message
      :show="Boolean(toastMessage)"
      :message="toastMessage"
    />
  </v-app>
</template>

<script>
  import { mapGetters,  mapMutations } from 'vuex';

  import AppMap from '@/components/app-map/app-map';
  import AppPanel from '@/components/app-panel/app-panel';
  import ToastMessage from '@/components/toast-message/toast-message';
  import WelcomeDialog from '@/components/welcome-dialog/welcome-dialog';
  import ImagesDialog from '@/components/images-dialog/images-dialog.vue';

  export default {
    components: {
      AppMap,
      AppPanel,
      ToastMessage,
      WelcomeDialog,
      ImagesDialog,
    },
    computed: {
      ...mapGetters('app', [ 'toastMessage', 'showImagesDialog' ]),

    },
    data() {
      return {
        menuOpen: false,
      };
    },
    methods: {
      ...mapMutations({
        openImagesDialog: 'app/OPEN_IMAGE_DIALOG',
      }),
      openDialog() {
        this.openImagesDialog();
      },
      openReport() {
        window.open('https://grondwater-ijmuiden.openearth.nl/static/reports/11207510-000-BGS-0002_v0.1-Monitoring verzilting grondwaterwater SO-IJ & Zeesluis IJmuiden _incl_bijlage - 11-2022.pdf', '_blank');
      },
    },
  };
</script>
