<template>
  <v-container>
    <v-card class="mx-auto" max-width="400" v-if="$store.state.user.users.length > 0">
      <v-img height="300" :src="setProfilePicture()"></v-img>

      <v-card-title>{{ $store.state.user.users[userIndex].nome }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <div class="grey--text">{{ $store.state.user.users[userIndex].turma }}</div>
        </v-row>

        <div class="mt-5">{{ $store.state.user.users[userIndex].desc }}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-text class="text-center">
        <v-chip
          v-for="materia in $store.state.user.users[userIndex].materias"
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
            <v-btn
              large
              @click="match($store.state.user.users[userIndex].id)"
              elevation="5"
            >
              <v-icon color="error">mdi-thumb-down</v-icon></v-btn
            >
          </v-col>
          <v-col cols="3">
            <v-btn
              @click="match($store.state.user.users[userIndex].id)"
              large
              elevation="5"
            >
              <v-icon color="success">mdi-thumb-up</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>

    <v-card class="mx-auto px-4" max-width="400" v-else>
      <v-card-title>🙁 Está vazio aqui...</v-card-title>
      <v-card-text>
        <v-row>
          <div class="my-3">Aproveite suas combinações em "Combinações" no Menu ou volte mais tarde</div>
        </v-row>
      </v-card-text>
    </v-card>

    <match-overlay @ifriends_next="nextUser" :overlay="overlays.match" :user="$store.state.user.users[userIndex]"/>
  </v-container>
</template>

<script>
import Vue from "vue";
import MatchRequest from "./../../requests/MatchRequest";
import MatchOverlay from "./MatchOverlay.vue";

export default Vue.extend({
  data() {
    return {
      opacity: 0.95,
      overlays: {
        match: false,
        empty: true,
      },
      userIndex: 0,
      p: [
        {
          img: "https://i.redd.it/2t96qnhl65p51.jpg",
        },
      ],
    };
  },
  mounted() {
    this.load(false);
  },
  methods: {
    setProfilePicture(){
      const url = `http://localhost:777/uploads/${this.$store.state.user.users[this.userIndex].foto}`
      return url ?? "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
    },
    nextUser() {
      this.overlays.match = false

      if (this.$store.state.user.users.length !== 0) {
        this.userIndex++
        this.load(true)
      }
    },
    async match(destino_id) {
      const index = this.userIndex + 1;

      const origem_id = this.$store.state.user.id;
      const token = this.$store.state.user.token;

      const request = new MatchRequest(token, origem_id, destino_id);

      const response = await request.send();

      if (response.data.match) {
        this.overlays.match = true
        return
      }

      if (this.$store.state.user.users.length != index) {
        this.userIndex++;
        this.load(true)
      } else {
        this.overlays.empty = false
        this.load(false)
        console.log("acabo");
      }
    },
    async load(data) {
      await this.$store.dispatch("loadUsers", this.$store.state.user.token);
      this.$store.commit("saveUser");

      if(data){
        this.userIndex--
        await this.$store.dispatch("loadMatchs", this.$store.state.user.token);
        this.$store.commit("saveUser");
      }
      console.log('userIndex: ' + this.userIndex + ', Users Length: ' + this.$store.state.user.users.length)

    },
  },
  components: {
    MatchOverlay
  }
});
</script>

<style>
</style>