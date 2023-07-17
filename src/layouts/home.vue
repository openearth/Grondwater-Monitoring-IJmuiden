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
              <p class="text-body-1">Welkom bij de webviewer voor grondwatermonitoring rondom het IJmuiden sluizencomplex, uitgevoerd door Deltares in opdracht van Rijkswaterstaat. Deze webviewer biedt inzicht in de monitoringsresultaten van het project en helpt bij het volgen van de verzilting in de komende jaren.
                <br>Bij de aanleg van de Zeesluis IJmuiden en SO-IJ wordt de bodem van het Noordzeekanaal verdiept, waarbij een weerstandbiedende kleilaag wordt vergraven. Dit kan mogelijk leiden tot contact tussen zout zeewater en het zoete of brakke grondwater in het onderliggende watervoerende pakket. Hoewel de verzilting waarschijnlijk beperkt zal blijven tot binnen de kanaaloevers, willen we door middel van monitoring eventuele verzilting vroegtijdig constateren en volgen.
                <br>De webviewer toont de monitoringsresultaten, waarbij er onderscheid wordt gemaakt tussen het Freatische pakket, het 1e watervoerende pakket (gescheiden door een kleilaag op ca. 17 m-NAP) en het 2e watervoerende pakket onder de Eemklei op ca. 40 m-NAP. Het 1e watervoerende pakket bevat momenteel zoet tot brak water, en de mogelijke verzilting van deze laag staat centraal in dit onderzoek.
                <br>De webviewer biedt informatie over grondwaterstanden, geologie en waterkwaliteit. U kunt de gemeten grondwaterstanden per pakket bekijken, evenals boorgatmetingen en de resultaten van bemonstering en veldmetingen op elke meetlocatie.
              </p>
              <v-btn
                class="custom-btn"
                :to="{ name: 'map' }"
                color="primary"
              >
                Bekijk de kaart
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
              <div class="container">
                <v-img
                  :lazy-src="image"
                  :src="image"
                  max-width="700"
                  alt=""
                  class="centered-img"
                />
              </div>
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
  import image from '@/assets/img/figure_landing_text.png';

  export default {
    data() {
      return {
        image: image,
      };
    },
    computed: {
      currentYear() {
        return new Date().getFullYear();
      },
    },
    created() {
      this.resetApp();
      this.resetLevel();
      this.resetPh();
      this.resetEc();
      this.resetRedox();
      this.resetLocations();
    },
    methods: {
      ...mapActions('app', { resetApp: 'reset' }),
      ...mapActions('level', { resetLevel: 'reset' }),
      ...mapActions('ph', { resetPh: 'reset' }),
      ...mapActions('ec', { resetEc: 'reset' }),
      ...mapActions('redox', { resetRedox: 'reset' }),
      ...mapActions('locations', { resetLocations: 'reset' }),
    },
  };
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100;
}

.centered-img {
  max-width: 700px;
  margin-top: 30px;
}

.custom-btn {
  min-height: 40px;
  margin-top: 10px;
}
</style>
