<template>
  <v-app>
    <AppBar :showNav="!['Login', 'Signup'].includes(this.$router.currentRoute.name)" @toggle-drawer="$refs.drawer.drawer = !$refs.drawer.drawer"/>
    <Drawer v-if="!['Login', 'Signup'].includes(this.$router.currentRoute.name)" ref="drawer"/>
    <v-main tag="main">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import AppBar from './components/AppBar.vue'
import Drawer from './components/Drawer.vue'

export default {
  name: 'App',
  components: {
    AppBar,
    Drawer,
  },
  data: () => ({
    drawer: false,
  }),
};
</script>

<style scoped>
  main {
    overflow-x: hidden;
  }
</style>