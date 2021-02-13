<template>
  <v-container>
    <v-card
      class="mx-auto my-3"
      max-width="400"
    >
      <v-img height="250" :src="`${p[0].img}`"></v-img>

      <v-card-title>{{ $store.state.user.users[i].nome }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <div class="grey--text">{{ p[0].turma }}</div>
        </v-row>

        <div class="mt-5">{{ p[0].bio }}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-text class="text-center">
        <v-chip
          v-for="materia in $store.state.user.users[i].materias"
          :key="materia.id"
          class="ma-2"
          color="primary"
          text-color="white"
          label
        >
          {{ materia.nome }}
        </v-chip>
      </v-card-text>

      <v-card-actions class="px-5">
        <v-row class="my-2 justify-center">
          <v-col cols="3">
            <v-btn large v-on:click="i++" elevation="5">
              <v-icon color="error">mdi-thumb-down</v-icon></v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn @click="match($store.state.user.users[i].id)" large elevation="5">
              <v-icon color="success">mdi-thumb-up</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";
import MatchRequest from "./../../requests/MatchRequest"

export default Vue.extend({
  data() {
    return {
      i: 0,

      p: [
        {
          nome: "WhatsApp Junior",
          turma: "IA18",
          bio:
            "whatsapp junior 🙏🏻 whatsapp junior 🙏🏻 whatsapp junior 🙏🏻 whatsapp junior 🙏🏻 ",
          img: "https://i.redd.it/2t96qnhl65p51.jpg",
        }
      ],
    };
  },
  methods: {
    async match(destino_id) {
      this.i++
      const origem_id = this.$store.state.user.id
      const token = this.$store.state.user.token

      console.log(token, origem_id, destino_id)

      const request = new MatchRequest(token, origem_id, destino_id)

      const response = await request.send()

      if(response.match){
        alert("UM MATCH OMG")
      }
    },
  },
});
</script>

<style>
</style>