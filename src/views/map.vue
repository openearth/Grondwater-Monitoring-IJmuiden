<template>
  <div class="pa-4 d-flex flex-column">
    <active-location v-if="activeLocation" />
    <v-alert
      v-else
      dense
      outlined
      type="info"
    >
      Selecteer een punt op de kaart voor meer informatie.
    </v-alert>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  import activeLocation from '@/components/active-location/active-location';

  export default {
    components: { activeLocation },
    created() {
      this.getLocations();
    },
    computed: {
      ...mapGetters('locations', [ 'activeLocation' ]),
    },
    methods: {
      ...mapActions('locations', [ 'getLocations' ]),
    },
  };
</script>
