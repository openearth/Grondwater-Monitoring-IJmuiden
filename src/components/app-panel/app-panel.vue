<template>
  <div class="app-panel" :class="{ 'app-panel--collapsed': panelIsCollapsed }">
    <v-btn
      v-if="!panelIsCollapsed"
      class="app-panel__minimize"
      icon
      title="Minimaliseer"
      @click="onClick"
    >
      <v-icon>mdi-chevron-down</v-icon>
    </v-btn>
    <router-view />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters('app', [ 'panelIsCollapsed' ]),
    },
    methods: {
      ...mapActions('app', [ 'setPanelIsCollapsed' ]),
      ...mapActions('level', { resetLevel: 'reset' }),
      ...mapActions('ph', { resetPh: 'reset' }),
      ...mapActions('ec', { resetEc: 'reset' }),
      ...mapActions('redox', { resetRedox: 'reset' }),
      ...mapActions('locations', [ 'resetActiveLocation' ]),
      onClick() {
        this.setPanelIsCollapsed({ isCollapsed: true });
        this.resetLevel();
        this.resetPh();
        this.resetEc();
        this.resetRedox();
        this.resetActiveLocation();
      },
    },
  };
</script>

<style src="./app-panel.css"></style>
