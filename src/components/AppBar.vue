<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon v-if="showNav" @click.stop="$emit('toggle-drawer')"></v-app-bar-nav-icon>
    <v-card-title> IFriends </v-card-title>
  </v-app-bar>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    showNav: {
      default: false
    }
  }
})
</script>
