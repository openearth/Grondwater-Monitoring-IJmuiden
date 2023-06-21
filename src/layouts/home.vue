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
    </v-app-bar>
    <v-main>
      <section>
        <v-parallax src="@/assets/img/header.jpg" height="400" />
      </section>
      <section class="blue lighten-5">
        <v-container class="py-16">
          <v-row dense justify="center">
            <v-col
              sm="12"
              md="10"
              xl="6"
            >
              <h1 class="text-h4 mb-6">Grondwater Monitoring IJmuiden</h1>
              <p class="text-body-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel risus risus. Maecenas ac tincidunt sapien, eget aliquet mauris. Sed eleifend, metus ut maximus laoreet, neque dui volutpat neque, eu suscipit lectus sapien non lacus. Suspendisse vel nisl posuere, porttitor tortor ut, consequat lacus. Vestibulum eleifend egestas mi, eu pharetra nulla fringilla vitae. Vivamus ultricies magna eu eros vehicula pellentesque. Vestibulum elementum orci tempus nunc consequat, ac luctus nisl tristique. Praesent blandit porttitor vulputate. Aliquam vulputate, lectus nec interdum posuere, nunc enim auctor diam, eget elementum augue ex non enim. Vivamus eget interdum est. Proin luctus quis eros et pretium. Morbi ac augue orci.</p>
              <v-btn
                :to="{ name: 'map' }"
                color="primary"
                depressed
              >
                Bekijk de kaart
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </v-main>
    <v-footer color="primary" dark>
      <v-container>
        <v-row dense justify="center">
          <v-col
            sm="12"
            md="10"
            xl="6"
          >
            <span class="text-body-2">&copy; Deltares - {{ currentYear }}</span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    computed: {
      currentYear() {
        return new Date().getFullYear();
      },
    },
    created() {
      this.resetApp();
      this.resetLevel();
      this.resetPh();
      this.resetLocations();
    },
    methods: {
      ...mapActions('app', { resetApp: 'reset' }),
      ...mapActions('level', { resetLevel: 'reset' }),
      ...mapActions('ph', { resetPh: 'reset' }),
      ...mapActions('locations', { resetLocations: 'reset' }),
    },
  };
</script>
