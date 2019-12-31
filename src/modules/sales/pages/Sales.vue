<template>
  <q-page>
    <div class="q-pa-md">
      <q-item-label header>Sales </q-item-label>

      <q-separator inset />
      <!-- {{salesProductList}} -->
      <q-list
        bordered
        class="rounded-borders full-width"
        v-for="(salesProduct,index) in salesProductList"
        :key="index"
      >
        <!-- <q-item-label header>Product List</q-item-label>

        <q-separator inset /> -->

        <q-item>
          <q-item-section
            top
            class="col-2 gt-sm"
          >
            <q-item-label class="q-mt-sm">{{index}}</q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">[{{getProductName(salesProduct.prodId)}}]</span>
            </q-item-label>
            <q-item-label
              caption
              lines="1"
            >
              {{product.prodDesc}}
            </q-item-label>
            <q-item-label
              lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
            >
              <span>price: {{salesProduct.prodPrice}}</span><br />
              <span>Quantity: {{salesProduct.prodQuantity}}</span>

            </q-item-label>
          </q-item-section>

          <q-item-section
            top
            side
            class="q-pt-md"
          >
            {{salesProduct.prodPrice * salesProduct.prodQuantity}} tk
          </q-item-section>
          <q-item-section
            top
            side
            class="q-pt-md"
          >
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="gt-xs"
                size="12px"
                color="red"
                flat
                dense
                round
                @click="deleteProduct(product)"
                icon="delete"
              />
              <q-btn
                class="gt-xs"
                size="12px"
                color="green"
                flat
                dense
                round
                icon="edit"
              />
              <q-btn
                size="12px"
                flat
                dense
                round
                icon="more_vert"
              />
            </div>
          </q-item-section>
        </q-item>

        <q-separator />

      </q-list>
      <q-item>
        <q-item-section class="col-10">

        </q-item-section>
        <q-item-section
          side
          top
        >
          <q-item-label class="text-weight-bold text-h6"> {{totalPrice}} tk</q-item-label>
        </q-item-section>
      </q-item>
      <br />
      <q-btn
        @click="openDialog()"
        label="add product"
      />
      <q-input
        class="q-my-md"
        v-model="comment"
        filled
        type="textarea"
      />
      <!-- <q-select
        v-model="employee"
        :options="employeeList"
        option-value="id"
        option-label="fname"
        map-options
        emit-value
        label="Employee"
      /> -->

      <q-btn
        label="Sale"
        @click="handleCreateSale"
      />
    </div>

    <q-dialog
      v-model="addProductDialog"
      transition-show="slide-down"
      transition-hide="slide-up"
    >
      <q-card style="width:800px">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Add Product</span>
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="product.prodId"
            :options="productList"
            option-value="prodId"
            option-label="prodName"
            map-options
            emit-value
            label="Product Name"
          />
          <q-input
            v-model="product.prodQuantity"
            label="Quantity"
            type="number"
          />
          <q-input
            v-model="product.prodPrice"
            type="number"
            label="Price"
          />

        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancle"
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            label="Add"
            color="primary"
            @click="addProductInProductList()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Sales',
  data() {
    return {
      addProductDialog: false,
      salesProductList: [],
      productListModel: [],
      product: {
        prodId: '',
        prodQuantity: '',
        prodPrice: '',
      },
      employee: this.userId,
      comment: '',
    };
  },
  created() {
    this.$store.dispatch('loadProductCategoryList');
    this.$store.dispatch('loadProductList');
    console.log(this.productList);
  },
  methods: {
    addProductInProductList() {
      this.salesProductList.push(this.product);
      this.product = {};
      console.log(this.salesProductList);
    },
    openDialog() {
      this.addProductDialog = true;
    },
    getProductName(id) {
      return this.productList.find(product => product.prodId === id).prodName;
    },
    handleCreateSale() {
      const data = {
        products: this.salesProductList,
        comment: this.comment,
        empId: this.userId,
      };
      this.$store.dispatch('createSale', data).then(() => {
        this.salesProductList = [];
        this.$q.notify({
          message: 'Sales done',
          color: 'primary',
        });
      });
      console.log(data);
    },
    deleteProduct(product) {
      this.salesProductList.pop(product);
    },
  },
  computed: {
    ...mapState({
      productCategoryList: state => state.inventory.productCategoryList,
      productList: state => state.inventory.productList,
      userList: state => state.administration.userList,
      employeeList: state => state.administration.employeeList,
      userProfile: state => state.auth.user,
    }),
    userId() {
      return this.userProfile.data.data.id;
    },
    totalPrice() {
      let total = 0;
      this.salesProductList.forEach((element) => {
        total += element.prodQuantity * element.prodPrice;
      });
      return total;
    },
  },
};
</script>

<style>
</style>
