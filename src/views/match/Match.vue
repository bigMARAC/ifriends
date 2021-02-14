<template>
  <v-card class="mx-auto my-5" max-width="400">
    <v-row align="center" justify="space-around">
      <v-card-title>Veja suas combinações aqui:</v-card-title>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <v-list class="mb-5">
      <v-list-item-group>
        <v-list-item v-for="match in $store.state.user.matchs" :key="match.id">
          <template>
            <v-list-item-icon>
              <v-icon>mdi-face</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="match.nome"></v-list-item-title>
            </v-list-item-content>
            <v-list-action>
              <v-btn
                class="mr-3"
                fab
                small
                :href="`https://www.instagram.com/${match.instagram}`"
                target="_blank"
              >
                <v-icon class="mx-5" color="#ff68be">mdi-instagram</v-icon>
              </v-btn>
              <v-btn
                fab
                small
                :href="`https://api.whatsapp.com/send?phone=${match.phone}&text=B%C3%B3%20comer%20um%20cu`"
                target="_blank"
              >
                <v-icon color="success">mdi-whatsapp</v-icon>
              </v-btn>
            </v-list-action>
            <!-- <div class="text-center">
              <v-btn class="mx-5" fab color="#ff68be" small elevation="2">
              </v-btn>
              <v-btn fab color="success" small elevation="2">
              </v-btn>
            </div> -->
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      matchs: [
        {
          id: 1,
          nome: "Testando",
          instagram: null,
        },
        {
          id: 2,
          nome: "testando 02",
          instagram: "bigmarac",
        },
      ],
    };
  },

  mounted() {
    this.loadMatchs();
  },

  methods: {
    async loadMatchs() {
      await this.$store.dispatch("loadMatchs", this.$store.state.user.token);
      this.$store.commit("saveUser");

      console.log(this.$store.state.user.token);
    },
  },
});
</script>

<style>
</style>