<template>
  <q-layout view="hHh Lpr lff">
    <q-header
      elevated
      class="bg-prime"
    >
      <q-toolbar>
        <q-btn
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        />
        <q-toolbar-title>Sales And Inventory App</q-toolbar-title>
        <q-btn
          flat
          label="Logout"
          @click="logout()"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            clickable
            v-ripple
            to="/dashboard"
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>Dashboard</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/sales"
          >
            <q-item-section avatar>
              <q-icon name="monetization_on" />
            </q-item-section>

            <q-item-section>Sales</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            to="/inventory"
          >
            <q-item-section avatar>
              <q-icon name="store" />
            </q-item-section>

            <q-item-section>Inventory</q-item-section>
          </q-item>

          <q-separator />

          <q-item
            clickable
            v-ripple
            to="/report"
            v-if="isAdmin"
          >
            <q-item-section avatar>
              <q-icon name="pie_chart" />
            </q-item-section>

            <q-item-section>Report</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="isAdmin"
            to="/administration"
          >
            <q-item-section avatar>
              <q-icon name="security" />
            </q-item-section>

            <q-item-section>Adminstration</q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-if="isAdmin"
            to="/users"
          >
            <q-item-section avatar>
              <q-icon name="verified_user" />
            </q-item-section>

            <q-item-section>Users</q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from 'quasar';

export default {
  name: 'ProjectLayout',
  data() {
    return {
      drawer: false,
      miniState: true,
    };
  },
  computed: {
    isAdmin() {
      console.log('local storage is ', LocalStorage.getItem('isAuthenticated').data.data.type);
      return LocalStorage.getItem('isAuthenticated').data.data.type === 'ADMIN';
    },
  },
  methods: {
    logout() {
      console.log('logoout clicked');
      LocalStorage.clear();
      this.$router.push('/auth');
    },
  },
};
</script>

<style lang="sass" scoped>
.mini-slot
  // transition: background-color .28s
  &:hover
    // background-color: rgba(0, 0, 0, .04)

.mini-icon
  // font-size: 1.718em

  & + &
    // margin-top: 18px
</style>
