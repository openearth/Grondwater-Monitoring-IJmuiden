<template>
  <div class="details d-flex flex-row">
    <div class="details__column">
      <h3 class="text-h6">
        Details meetlocatie
      </h3>
      <location-details />
      <v-divider class="my-8" />
      <level-details />
    </div>

    <div class="details__column" style="margin-top: 30px">
          <v-card>
      <v-tabs
        background-color="primary"
        center-active
        dark
      >
        <v-tab>Grondwaterstand</v-tab>
        <v-tab>Geologie</v-tab>
        <v-tab>Waterkwaliteit</v-tab>
        <v-tab>Veldmeting</v-tab>

      <v-tab-item style="margin: 10px">
        <h3 v-if="!activeLevel" class="text-h6">
          Er is geen peilfilter geselecteerd, kies 'Selecteer peilfilter op deze meetlocatie' <br>
          <v-icon color="black" size="48">mdi-arrow-bottom-left</v-icon>
        </h3>
        <h3 v-if="activeLevel" class="text-h6">
          Tijdreeks voor {{ id }}
        </h3>
      <area-chart v-if="showChart" />
      </v-tab-item>

      <v-tab-item style="margin: 10px">
        <h3 class="text-h6">
          Boorgatmeting van meetlocatie {{loc_id}} <br>
          <div class="location-details__images" v-if="images.length">
            <a
              v-for="image in images"
              :key="image"
              :href="image"
              target="_blank"
              title="Open afbeelding in nieuw tabblad"
            >
              <v-img
                :lazy-src="image"
                max-width="700"
                :src="image"
                alt=""
              />
            </a>
          </div>
        </h3>
      </v-tab-item>

      <v-tab-item style="margin: 10px">
        <h3 class="text-h6">
          Waterkwaliteit van meetlocatie {{loc_id}} <br>
          <div class="location-details__images" v-if="images.length">
            <a
              v-for="table in tables"
              :key="table"
              :href="table"
              target="_blank"
              title="Open afbeelding in nieuw tabblad"
            >
              <v-img
                :lazy-src="table"
                max-width="1200"
                :src="table"
                alt=""
              />
            </a>
          </div>
        </h3>
      </v-tab-item>

      <v-tab-item style="margin: 10px">
        <h3 v-if="!activeLevel" class="text-h6">
          Er is geen peilfilter geselecteerd, kies 'Selecteer peilfilter op deze meetlocatie' <br>
          <v-icon color="black" size="48">mdi-arrow-bottom-left</v-icon>
        </h3>
        <h3 v-if="activeLevel" class="text-h6">
          Informatie van  {{ id }}
          <br>
          <br>
          <h5> Electrical Conductivity </h5>
          <v-card elevation="5">
            <v-simple-table v-if="activeLocation">
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>EC [uS/cm]</th>
                </tr>
                <tr v-for="item in ecTimeseries" :key="item.date">
                  <td>{{ item.date }}</td>
                  <td>{{ item.head }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
          <br>
          <h5> pH </h5>
          <v-card elevation="5">
            <v-simple-table v-if="activeLocation">
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>pH [-]</th>
                </tr>
                <tr v-for="item in phTimeseries" :key="item.date">
                  <td>{{ item.date }}</td>
                  <td>{{ item.head }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
          <br>
          <h5> Redox potential </h5>
          <v-card elevation="5">
            <v-simple-table v-if="activeLocation">
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Redox [mV]</th>
                </tr>
                <tr v-for="item in redoxTimeseries" :key="item.date">
                  <td>{{ item.date }}</td>
                  <td>{{ item.head }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </h3>
      </v-tab-item>

      </v-tabs>
    </v-card>

    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  import AreaChart from '@/components/area-chart/area-chart';
  import LevelDetails from '@/components/level-details/level-details';
  import LocationDetails from '@/components/location-details/location-details';
  import getLocationImages from '@/lib/get-location-images';
  import getTableImages from '@/lib/get-table-images';
  
  export default {
    components: {
      AreaChart,
      LevelDetails,
      LocationDetails,
    },
    data() {
      return {
        images: [],
        tables: [],
      };
    },
    created() {
      this.getLocations();
    },
    computed: {
      ...mapGetters('level', { activeLevel: 'activeLevel', levelTimeseries: 'timeseries' }),
      ...mapGetters('ph', { activePh: 'activePh', phTimeseries: 'timeseries' }),
      ...mapGetters('ec', { activeEc: 'activeEc', ecTimeseries: 'timeseries' }),
      ...mapGetters('redox', { activeRedox: 'activeRedox', redoxTimeseries: 'timeseries' }),
      ...mapGetters('locations', [ 'activeLocation' ]),

      id() {
        return this.activeLevel.properties.locationid;
      },
      showChart() {
        return this.activeLevel && this.levelTimeseries.length > 0;
      },
      loc_id() {
        if (this.activeLocation && this.activeLocation.properties) {
          return this.activeLocation.properties.loc_id;
        }
        return null;
      },
    },
    methods: {
      ...mapActions('locations', [ 'getLocations', 'setTimeseriesModalOpen' ]),
      onClick() {
        this.setTimeseriesModalOpen({ open: true });
      },
    },
    watch: {
      activeLocation(location) {
        if (location) {
          getLocationImages({ id: location.properties.loc_id })
            .then((images) => this.images = images);
        }
        if (location) {
          getTableImages({ id: location.properties.loc_id })
            .then((tables) => this.tables = tables);
        }
      },
    },
  };
</script>

<style src="./map.css"></style>
