<template>
  <q-page>
    <div class="q-pa-md">
      <q-item-label header>Sales Report</q-item-label>
      <!-- {{salesList}} -->
      <q-separator inset />
      <div
        v-for="(sales,index) in salesList"
        :key="index"
        class="column full-width"
      >
        <div
          class="row border"
          v-for="(sale,index) in sales.data"
          :key="index"
        >
          <!-- {{sale}} -->
          <div class="column border col-2">sales id: {{sale.id}}</div>
          <div class="col">
            <div
              class="col column test"
              v-for="(product,index) in sale.products"
              :key="index"
            >
              <div class="col border">
                <p>product id: {{product.prodId}}</p>
                <p>product name: {{product.prodName}}</p>
                <p>product price: {{product.prodPrice}}</p>
                <p>product Quantity: {{product.prodQuantity}}</p>
              </div>
            </div>
          </div>
          <div class="col-2 column">

            <div class="border col">Employee id : {{sale.empId}}</div>
            <div class="border col">{{sale.comment}}</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('loadSalesList');
  },
  methods: {
    test() {
      this.$store.dispatch('loadSalesList').then((res) => {
        console.log(res);
      });
    },
  },
  computed: {
    ...mapState({

      salesList: state => state.sales.salesList,
    }),
  },
};
</script>

<style>
.border {
  border: 1px solid black;
}
</style>
