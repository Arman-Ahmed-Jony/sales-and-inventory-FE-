<template>
  <q-page class>
    <!-- <h3>Inventory page is under construction</h3> -->
    <div class="q-pa-md">

      <!-- <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
      </div>-->
      {{productCategoryList}}

      <q-btn
        label="show category list"
        class="q-mr-md q-mt-lg"
        @click="showCategoryDialog()"
      />
      <q-btn
        label="add a product"
        class="q-mr-md q-mt-lg"
        @click="addProduct=true"
      />
      <q-btn
        label="delete selected products"
        class="q-mt-lg"
        @click="confirm = true"
      />
      <q-btn @click="test">test</q-btn>
    </div>

    <q-dialog
      v-model="addProduct"
      persistent
    >
      <q-card style="width:800px">
        <q-card-section class="row items-center">
          <q-avatar
            icon="add_circle"
            color="green"
            text-color="white"
          />
          <span class="q-ml-sm">Add Product</span>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="text"
            label="Name"
          />
          <q-input
            v-model="text"
            label="Description"
          />
          <q-input
            v-model="text"
            label="Category"
          />
          <q-input
            v-model="text"
            label="Price"
          />
          <q-input
            v-model="text"
            label="Quantity"
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
            v-close-popup
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
          <q-list
            bordered
            separator
            v-for="(category,index) in productCategoryList"
            :key="index"
          >
            <q-item>
              <q-item-section>{{index}}</q-item-section>
              <q-item-section>{{category.categoryName}}</q-item-section>
              <q-item-section>
                <q-btn
                  label="delete"
                  @click="deleteCategoty(category.id)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Decline"
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            label="Accept"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
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
      text: '',
      confirm: false,
      addProduct: false,
      categoryDialog: true,
    };
  },
  created() {
    this.$store.dispatch('loadProductCategoryList');
  },
  computed: {
    ...mapState({
      productCategoryList: state => state.inventory.productCategoryList,
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
      });
    },
    test() {
      this.$store.dispatch('loadProductCategoryList').then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang="sass">

</style>
