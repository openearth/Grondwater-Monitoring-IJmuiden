<template>
  <div class="level-select">
    <v-select
      v-model="selectedLevel"
      label="Selecteer peilfilter op deze meetlocatie"
      :items="levels"
      @change="onChange"
    />
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        selectedLevel: null,
        levels: [
          { text: 'Peilfilter 1', value: 'ID_1' },
          { text: 'Peilfilter 2', value: 'ID_2' },
          { text: 'Peilfilter 3', value: 'ID_3' },
        ],
      };
    },
    methods: {
      ...mapActions('locations', [ 'setActiveLevel' ]),
      onChange() {
        const level = { id: this.selectedLevel };
        this.setActiveLevel({ level });
      },
    },
  };
</script>
