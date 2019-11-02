<template>
    <q-layout view="hHh Lpr lff">
      <q-header elevated class="bg-prime">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Sales And Inventory App</q-toolbar-title>
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
            <q-item clickable v-ripple to="/company/dashboard">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>Dashboard</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/company/sales">
              <q-item-section avatar>
                <q-icon name="monetization_on" />
              </q-item-section>

              <q-item-section>Sales</q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="store" />
              </q-item-section>

              <q-item-section>Inventory</q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="pie_chart" />
              </q-item-section>

              <q-item-section>Report</q-item-section>
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
export default {
  name: 'ProjectLayout',
  data() {
    return {
      drawer: false,
      miniState: true,
    };
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
