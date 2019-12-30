<template>
  <q-page>
    <div
      v-if="loading"
      class="absolute-full text-subtitle2 flex flex-center"
    >
      <q-spinner-grid
        color="teal"
        size="6em"
      />
    </div>
    <div
      v-else
      class="row"
    >
      <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
      <!-- <h3>Dashboard page is going to be worked today</h3> -->
      <!-- {{SalesListTableData}} -->
      <!-- sales vs total price chart -->

      <!-- <div
        v-for="(sales, index) in SalesListTableData"
        :key="index"
      >
        <span>{{sales}}</span>
      </div> -->
      <div class="salesChart col">
        <span style="text-align: center">sales vs total price chart</span>
        <bar-chart :chart-data="datacollection"></bar-chart>
      </div>
      <!-- end -->
      <!-- sales vs total price chart -->
      <!-- <div
        v-for="(sales, index) in SalesListTableData"
        :key="index"
      >
        <span>{{sales}}</span>
      </div> -->
      <div class="salesChart col">
        <line-chart :chart-data="datacollection"></line-chart>
      </div>
      <!-- end -->

    </div>

  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import BarChart from '../../../charts/BarChart';
import LineChart from '../../../charts/LineChart';

export default {
  components: {
    LineChart,
    BarChart,
  },
  data() {
    return {
      datacollection: null,
      salesPrice: null,
      loading: true,
    };
  },
  created() {
    this.$store.dispatch('loadSalesList').then(() => {
      this.loading = false;
      this.fillData();
    });
  },
  computed: {
    ...mapState({
      salesList: state => state.sales.salesList,
    }),
    SalesListTableData() {
      const els = [];
      this.salesList.data.data.forEach((element) => {
        let totalPrice = 0;
        element.products.forEach((product) => {
          totalPrice += product.prodPrice * product.prodQuantity;
          console.log(totalPrice);
        });
        els.push(totalPrice);
      });
      return els;
    },
    SalesListTableLabel() {
      const els = [];
      this.salesList.data.data.forEach((element) => {
        let salesId = 0;
        salesId = element.id;
        console.log(salesId);
        els.push(salesId);
      });
      return els;
    },
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.SalesListTableLabel,
        datasets: [
          {
            label: 'Sales Vs Total Price',
            backgroundColor: 'rgba(52, 235, 67, 0.8)',
            data: this.SalesListTableData,
          },
        ],
      };
    },

    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>
<style scoped>
.salesChart {
  margin: 0 auto;
  width: 400px;
  border: 1px solid black;
}
.center {
  text-align: center;
  /* margin: 0 auto; */
}
</style>
