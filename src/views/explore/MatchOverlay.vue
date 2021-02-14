<template>
  <v-row align="center" justify="space-around" v-if="user !== undefined">
    <v-overlay :value="overlay" :opacity="0.9">
      <v-card-title>Você combina com essa pessoa!</v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-text class="text-center">
        <div>Entre em contato com {{ user.nome }}:</div>
      </v-card-text>
      <v-card-actions class="mt-3">
        <v-row align="center" justify="space-around">
          <v-col cols="3">
            <v-btn
              large
              :href="`https://www.instagram.com/${user.instagram}`"
              target="_blank"
              elevation="5"
            >
              <v-icon color="#ff68be">mdi-instagram</v-icon></v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn
              large
              elevation="5"
              :href="`https://api.whatsapp.com/send?phone=${user.phone}&text=B%C3%B3%20comer%20um%20cu`"
              target="_blank"
            >
              <v-icon color="success">mdi-whatsapp</v-icon></v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-divider class="mx-auto my-5"></v-divider>
          </v-col>
          <v-col cols="3">
            <v-btn @click="nextUser" color="success" outlined> C </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-overlay>
  </v-row>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    overlay: {
      type: Boolean,
      default: false
    },
    user: {}
  },
  methods: {
    nextUser() {
      this.$emit('ifriends_next', true)
    }
  }
});
</script>
