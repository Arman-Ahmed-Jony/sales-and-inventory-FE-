<template>
  <q-page class>
    <div class="q-pa-md">
      <q-item-label header>Product List</q-item-label>

      <q-separator inset />
      <q-list
        bordered
        class="rounded-borders full-width"
        v-for="(product,index) in productList"
        :key="index"
      >
        <!-- <q-item-label header>Product List</q-item-label>

        <q-separator inset /> -->

        <q-item>
          <q-item-section
            top
            class="col-2 gt-sm"
          >
            <q-item-label class="q-mt-sm">{{product.prodId}}</q-item-label>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">[{{product.prodName}}]</span>
              <span class="text-grey-8"> - {{productCategory(product.prodCategory)}}</span>
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
              <span>price: {{product.prodPrice}}</span><br />
              <span>Available: {{product.prodQuantity}}</span>

            </q-item-label>
          </q-item-section>

          <q-item-section
            top
            side
          >
            <div class="text-grey-8 q-gutter-xs">
              <!-- <q-btn
                class="gt-xs"
                size="12px"
                color="red"
                flat
                dense
                round
                @click="deleteProduct(product.prodId)"
                icon="delete"
              /> -->
              <q-btn
                class="gt-xs"
                size="12px"
                color="green"
                flat
                dense
                round
                icon="edit"
              />
            </div>
          </q-item-section>
        </q-item>

        <q-separator />

      </q-list>

      <q-btn
        label="show category list"
        class="q-mr-md q-mt-lg"
        @click="showCategoryDialog()"
      />
      <q-btn
        label="add a product"
        class="q-mr-md q-mt-lg"
        @click="addProductDialog=true"
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
          <q-input
            v-model="productId"
            label="SKU"
            type="number"
          />
          <q-input
            v-model="productName"
            label="Name"
          />
          <q-input
            v-model="productDescription"
            label="Description"
          />

          <q-select
            v-model="productCategoty"
            :options="productCategoryList"
            option-value="id"
            option-label="categoryName"
            map-options
            emit-value
            label="Category"
          />

          <q-input
            v-model="productPrice"
            label="Price"
            type="number"
          />
          <q-input
            v-model="productQuantity"
            label="Quantity"
            type="number"
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
            @click="addProduct()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="confirm"
      persistent
    >
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            icon="delete"
            color="red"
            text-color="white"
          />
          <span class="q-ml-sm">Do you realy want to delete these items?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="No"
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            label="Yes"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="categoryDialog"
      transition-show="slide-down"
      transition-hide="slide-up"
      class="q-pa-md"
      full-width
    >
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Product Category List</div>
        </q-card-section>
        <q-card-section>
          <q-item class="row">
            <q-item-section class="col-1">Category Id</q-item-section>
            <q-item-section>Category Name</q-item-section>
            <q-item-section class="col-1">Actions</q-item-section>
          </q-item>
          <q-list
            bordered
            separator
            v-for="(category,index) in productCategoryList"
            :key="index"
          >

            <q-item class="row">
              <q-item-section class="col-1">{{category.id}}</q-item-section>
              <q-separator vertical />
              <q-item-section class="col q-pl-md">{{category.categoryName}}</q-item-section>
              <q-separator vertical />
              <q-item-section class="col-1 q-pl-md">
                <q-btn
                  icon="delete"
                  color="red"
                  round
                  @click="deleteCategoty(category.id)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-section class="row q-pa-md">
          <q-input
            label="category name"
            class="col"
            dense
            v-model="categoryName"
          />
          <q-btn
            class="col1"
            round
            color="primary"
            icon="add"
            @click="addProductCategory()"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      selected: [],
      productCategoty: '',
      productName: '',
      productId: '',
      productDescription: '',
      productPrice: '',
      productQuantity: '',
      confirm: false,
      addProductDialog: false,
      categoryDialog: false,
      categoryName: '',
    };
  },
  created() {
    this.$store.dispatch('loadProductCategoryList');
    this.$store.dispatch('loadProductList');
  },
  computed: {
    ...mapState({
      productCategoryList: state => state.inventory.productCategoryList,
      productList: state => state.inventory.productList,
    }),
  },
  methods: {
    getSelectedString() {
      return this.selected.length === 0
        ? ''
        : `${this.selected.length} record${
          this.selected.length > 1 ? 's' : ''
        } selected of ${this.data.length}`;
    },
    showCategoryDialog() {
      this.categoryDialog = true;
    },
    deleteCategoty(id) {
      console.log('id is ', id);
      this.$store.dispatch('deleteProductCategory', id).then(() => {
        this.$store.dispatch('loadProductCategoryList');
        this.$store.dispatch('loadProductList');
      });
    },
    addProductCategory() {
      console.log(this.categoryName);
      const payload = {
        categoryName: this.categoryName,
      };
      this.$store.dispatch('addProductCategory', payload).then((response) => {
        console.log(response);
        this.$store.dispatch('loadProductCategoryList');
        this.categoryName = '';
      });
    },
    addProduct() {
      const payload = {
        prodCategory: this.productCategoty,
        prodId: parseInt(this.productId, 10),
        prodName: this.productName,
        prodDesc: this.productDescription,
        prodPrice: parseInt(this.productPrice, 10),
        prodQuantity: parseInt(this.productQuantity, 10),
      };
      console.log(payload);
      this.$store.dispatch('createProduct', payload).then((response) => {
        console.log('add product', response);
        this.$store.dispatch('loadProductCategoryList');
        this.$store.dispatch('loadProductList');
      });
    },
    productCategory(id) {
      return this.productCategoryList.find(prodCategory => prodCategory.id === id).categoryName;
    },
    deleteProduct(id) {
      this.$store.dispatch('deleteProduct', id).then(() => {
        this.$store.dispatch('loadProductCategoryList');
        this.$store.dispatch('loadProductList');
      });
    },
  },
};
</script>
<style lang="sass">

</style>
