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
      <!-- <q-item-label header>Product List</q-item-label>

        <q-separator inset /> -->

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
            <span class="text-grey-8"> {{emplyee.permanentAddress}}</span><br />
            <span class="text-grey-8"> {{emplyee.residentialAddress}}</span>
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
            <q-btn
              class="gt-xs"
              size="12px"
              color="green"
              flat
              dense
              round
              icon="done"
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
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {};
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
