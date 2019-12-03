<template>
  <q-page class="q-pa-md">
    <q-item-label header>User List</q-item-label>

    <q-separator inset />
    <q-list
      bordered
      class="rounded-borders full-width"
      v-for="(user,index) in userList"
      :key="index"
    >
      <q-item>
        <q-item-section
          top
          class="col-2 gt-sm"
        >
          <q-item-label class="q-mt-sm">{{user.empId}}</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{user.userName}}</span>

          </q-item-label>
          <q-item-label
            lines="1"
            class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
          >
            <span class="text-grey-8"> {{user.type}}</span>
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
              @click="deleteUser(user.id)"
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

          </div>
        </q-item-section>
      </q-item>

      <q-separator />

    </q-list>

    <q-btn
      label="Register User"
      class="q-mt-lg"
      @click="RegistrationDialog = true"
    />

    <q-dialog
      v-model="RegistrationDialog"
      transition-show="slide-down"
      transition-hide="slide-up"
    >
      <q-card style="width:800px">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Register a User</span>
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="employee"
            :options="employeeList"
            option-value="id"
            option-label="fname"
            map-options
            emit-value
            label="Employee"
          />
          <q-input
            v-model="userName"
            label="User Name"
          />

          <q-input
            v-model="password"
            label="Password"
            type="Password"
          />
          <q-select
            v-model="userType"
            :options="userTypeList"
            label="type"
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
            label="Register"
            color="primary"
            @click="createUser()"
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
      RegistrationDialog: false,
      userName: '',
      employee: '',
      userType: '',
      password: '',
      userTypeList: ['USER', 'ADMIN'],
    };
  },
  created() {
    this.$store.dispatch('loadUserList').then((res) => {
      this.$store.dispatch('loadEmployeeList');
      this.$q.dark.toggle();

      console.log(res);
    });
  },
  computed: {
    ...mapState({
      userList: state => state.administration.userList,
      employeeList: state => state.administration.employeeList,
    }),
  },
  methods: {
    deleteUser(id) {
      this.$store.dispatch('deleteUser', id).then(() => {
        this.$store.dispatch('loadUserList');
      });
    },
    createUser() {
      const user = {
        empId: this.employee,
        userName: this.userName,
        pass: this.password,
        type: this.userType,
      };
      this.$store.dispatch('createUser', user).then(() => {
        this.$store.dispatch('loadUserList');
        this.RegistrationDialog = false;
      });
    },
  },
};
</script>

<style>
</style>
