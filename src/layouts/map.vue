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
  import { mapGetters } from 'vuex';

  import AppMap from '@/components/app-map/app-map';
  import AppPanel from '@/components/app-panel/app-panel';
  import ToastMessage from '@/components/toast-message/toast-message';
  import WelcomeDialog from '@/components/welcome-dialog/welcome-dialog';

  export default {
    components: {
      AppMap,
      AppPanel,
      ToastMessage,
      WelcomeDialog,
    },
    computed: {
      ...mapGetters('app', [ 'toastMessage' ]),
    },
  };
</script>
