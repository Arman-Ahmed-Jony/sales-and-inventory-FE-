<template>
  <q-page class>
    <!-- <h3>Inventory page is under construction</h3> -->
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="data"
        :columns="columns"
        row-key="name"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        :selected.sync="selected"
      />

      <!-- <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
      </div>-->
      <q-btn label="add a category" class="q-mr-md q-mt-lg" />
      <q-btn label="add a product" class="q-mr-md q-mt-lg" @click="addProduct=true"/>
      <q-btn label="delete selected products" class="q-mt-lg" @click="confirm = true" />
    </div>

    <q-dialog v-model="addProduct" persistent >
      <q-card style="width:800px">
        <q-card-section class="row items-center">
          <q-avatar icon="add_circle" color="green" text-color="white" />
          <span class="q-ml-sm">Add Product</span>
        </q-card-section>
        <q-card-section>
          <q-input v-model="text" label="Name" />
          <q-input v-model="text" label="Description" />
          <q-input v-model="text" label="Category" />
          <q-input v-model="text" label="Price" />
          <q-input v-model="text" label="Quantity" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancle" color="primary" v-close-popup />
          <q-btn flat label="Add" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm">Do you realy want to delete these items?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn flat label="Yes" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      text: '',
      confirm: false,
      addProduct: false,
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'calories',
          align: 'center',
          label: 'Calories',
          field: 'calories',
          sortable: true,
        },
        {
          name: 'fat',
          label: 'Fat (g)',
          field: 'fat',
          sortable: true,
        },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        {
          name: 'calcium',
          label: 'Calcium (%)',
          field: 'calcium',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: 'iron',
          label: 'Iron (%)',
          field: 'iron',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
        },
      ],
    };
  },
  methods: {
    getSelectedString() {
      return this.selected.length === 0
        ? ''
        : `${this.selected.length} record${
          this.selected.length > 1 ? 's' : ''
        } selected of ${this.data.length}`;
    },
  },
};
</script>
<style lang="sass">

</style>
