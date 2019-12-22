<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section class="bg-white text-white">
        <!-- <div class="text-h6">Login</div> -->
        <img
          alt="App logo"
          class="logo"
          src="~assets/logo.svg"
        >
      </q-card-section>

      <!-- <q-separator /> -->
      <q-card-section class="q-mt-md">
        <q-input
          filled
          bottom-slots
          v-model="userName"
          label="User Email"
        >
          <template v-slot:prepend>
            <q-icon name="supervised_user_circle" />
          </template>
          <template v-slot:append>
            <q-icon
              name="close"
              @click="userName = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <q-input
          v-model="password"
          filled
          label="Password"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:prepend>
            <q-icon name="security" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="right">
        <!-- <q-btn flat>Action 1</q-btn> -->
        <q-btn
          flat
          class="q-mr-sm"
          @click="login()"
        >LOGIN</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userName: '',
      password: '',
      isPwd: true,
    };
  },
  created() {
    this.$store.dispatch('common/setPageTitle', 'Login');
  },
  methods: {
    login() {
      console.log('login clicked');
      const crid = {
        userName: this.userName,
        pass: this.password,
      };
      console.log(crid);
      // this.$store.dispatch('testAPI');
      this.$store.dispatch('signIn', crid).then((res) => {
        console.log('response is ', res);
        if (res.data.status !== 401) {
          console.log('ok route');
          this.$router.push({ path: '/dashboard' });
        } else {
          console.log('Invalid cridentials');
          this.$q.notify({
            message: 'You have entered invalid cridential',
            color: 'red',
          });
          this.password = '';
        }
      });
    },

  },
};
</script>

<style lang="sass" scoped>
.logo
  display: block
  margin: 0 auto
  width: 25%
  position: absolute
  top: -62px
  left: 38%
  // margin-left: -32.5px
.my-card
  width: 100%
  max-width: 400px
</style>
