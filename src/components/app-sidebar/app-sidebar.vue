<template>
  <v-navigation-drawer
    class="pa-2"
    app
    clipped
    permanent
    width="500"
  >
    <v-row dense class="fill-height">
      <v-col :cols="12">
        <router-view class="flex-grow-1" />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
  export default {};
</script>
