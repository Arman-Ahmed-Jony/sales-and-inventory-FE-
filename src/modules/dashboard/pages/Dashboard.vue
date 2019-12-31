<template>
  <q-page class="q-ma-sm">
    <div
      v-if="loading"
      class="absolute-full text-subtitle2 flex flex-center"
    >
      <q-spinner-grid
        color="teal"
        size="6em"
      />
    </div>
    <div v-else>
      <div>

        <q-chip
          v-for="(product, index) in productList"
          :key="index"
          size="18px"
        >
          <q-avatar
            :color="product.prodQuantity<5
              ?'red':'green'"
            text-color="white"
          >{{product.prodQuantity}}</q-avatar>
          {{product.prodName}}
        </q-chip>
      </div>
      <div class="charts-container row">
        <div class="salesChart">
          <span style="text-align: center">sales vs total price chart</span>
          <bar-chart :chart-data="datacollection"></bar-chart>
        </div>

        <div class="salesChart">
          <span style="text-align: center">sales vs total price chart</span>
          <line-chart :chart-data="datacollection"></line-chart>
        </div>
        <!-- end -->

      </div>
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
      productList: state => state.inventory.productList,
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
  margin: 50px;
  width: 400px;
  /* border: 1px solid black; */
}
.center {
  text-align: center;
  /* margin: 0 auto; */
}
.charts-container {
  margin: 0 auto;
  width: 90%;
}
</style>
