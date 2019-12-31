<template>
  <q-page class="q-pa-md">
    <q-item-label header>Employee List</q-item-label>

    <q-separator inset />
    <q-list
      bordered
      class="rounded-borders full-width"
      v-for="(emplyee,index) in employeeList"
      :key="index"
    >
      <q-item>
        <q-item-section
          top
          class="col-2 gt-sm"
        >
          <q-item-label class="q-mt-sm">{{emplyee.id}}</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{`${emplyee.fname} ${emplyee.lname}`}}</span>

          </q-item-label>
          <q-item-label
            lines="1"
            class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
          >
            <span class="text-grey-8"> {{emplyee.residentialAddress}}</span><br />
            <span class="text-grey-8"> {{emplyee.permanentAddress}}</span>
          </q-item-label>

        </q-item-section>
        <q-item-section
          top
          side
        >
          <div class="text-grey-8 q-gutter-xs">
            <q-btn
              class="gt-xs"
              size="12px"
              color="red"
              flat
              dense
              round
              @click="deleteEmployee(emplyee.id)"
              icon="delete"
            />

          </div>
        </q-item-section>
      </q-item>

      <q-separator />

    </q-list>

    <q-btn
      label="Add Employee"
      class="q-mt-lg"
      @click="employeeDialog = true"
    />

    <q-dialog
      v-model="employeeDialog"
      transition-show="slide-down"
      transition-hide="slide-up"
    >
      <q-card style="width:800px">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Add Employee</span>
        </q-card-section>
        <q-card-section>
          <!-- <q-input
            v-model="productId"
            label="SKU"
            type="number"
          /> -->
          <q-input
            v-model="fname"
            label="First Name"
          />
          <q-input
            v-model="lname"
            label="Last Name"
          />

          <q-input
            v-model="resinditialAddress"
            label="Resinditial Address"
          />
          <q-input
            v-model="permanentAddress"
            label="Permanent Address"
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
            @click="addEmployee()"
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
      employeeDialog: false,
      fname: '',
      lname: '',
      resinditialAddress: '',
      permanentAddress: '',
    };
  },
  created() {
    this.$store.dispatch('loadEmployeeList').then((res) => {
      console.log(res);
    });
  },
  computed: {

    ...mapState({
      employeeList: state => state.administration.employeeList,
    }),
  },
  methods: {
    addEmployee() {
      const employee = {
        fname: this.fname,
        lname: this.lname,
        permanentAddress: this.permanentAddress,
        residentialAddress: this.resinditialAddress,
      };
      this.$store.dispatch('createEmployee', employee).then(() => {
        this.$store.dispatch('loadEmployeeList');
      });
    },
    deleteEmployee(id) {
      this.$store.dispatch('deleteEmployee', id).then(() => {
        this.$store.dispatch('loadEmployeeList');
      });
    },
  },
};
</script>

<style>
</style>
