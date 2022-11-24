<template>
  <home-layout v-if="$route.name === 'home'" />
  <map-layout v-else />
</template>

<script>
  import HomeLayout from '@/layouts/home/home';
  import MapLayout from '@/layouts/map/map';

  export default {
    components: {
      HomeLayout,
      MapLayout,
    },
  };
</script>

<style src="./components/app-core/index.css"></style>
