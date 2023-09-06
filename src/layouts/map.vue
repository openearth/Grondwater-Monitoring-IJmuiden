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

      <v-spacer />

      <v-tabs
      right
      style="width: auto"
      class="mr-15">
        <v-tab @click="toggleDropdown">
          Home page
        </v-tab>
        <v-menu
        v-model="menuOpen"
        :close-on-content-click="false"
        offset-y>
          <template v-slot:activator="{ on }">
            <v-tab v-on="on">
              Bevindingen
            </v-tab>
          </template>
          <v-list>
            <v-list-item @click="menuItemClicked('Item 1')"> Kaarten en figuren</v-list-item>
            <v-list-item @click="menuItemClicked('Item 2')">Rapportages</v-list-item>
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
    <images-dialog :showImagesDialog="showImagesDialog" />
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';

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
      ...mapGetters('app', [ 'toastMessage' ]),
    },
    data() {
      return {
        menuOpen: false,
      };
    },
    methods: {
      toggleDropdown() {
        this.menuOpen = !this.menuOpen;
      },
      menuItemClicked(item) {
        console.log(`Clicked: ${ item }`);
      },
    },
  };
</script>

<style scoped>
/* Custom CSS to style the tab as a clickable element */
.v-tabs .v-tab {
  cursor: pointer;
}
</style>
