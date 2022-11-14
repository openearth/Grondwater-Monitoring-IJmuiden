<template>
  <v-app>
    <app-sidebar />

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

    <v-main>
      <app-map />
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
  import AppSidebar from '@/components/app-sidebar/app-sidebar';
  import ToastMessage from '@/components/toast-message/toast-message';
  import WelcomeDialog from '@/components/welcome-dialog/welcome-dialog';

  export default {
    components: {
      AppMap,
      AppSidebar,
      ToastMessage,
      WelcomeDialog,
    },
    computed: {
      ...mapGetters('app', [ 'toastMessage' ]),
    },
  };
</script>
