<template>
  <div class="pa-4 d-flex flex-column">
    <p class="text-body-1">Klik op een punt op de kaart voor meer informatie.</p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    created() {
      this.getLocations();
    },
    methods: {
      ...mapActions('locations', [ 'getLocations' ]),
    },
  };
</script>
