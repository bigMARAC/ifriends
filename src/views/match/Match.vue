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
              <v-img :src="setProfilePicture(match.foto)" max-width="40" max-height="40" class="rounded-circle"></v-img>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="match.nome"></v-list-item-title>
            </v-list-item-content>
            <div>
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
                :href="`https://api.whatsapp.com/send?phone=${match.phone}&text=Ol%C3%A1%2C+n%C3%B3s+combinamos+no+IFriends%21`"
                target="_blank"
              >
                <v-icon color="success">mdi-whatsapp</v-icon>
              </v-btn>
            </div>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import Vue from "vue";
import url from "./../../config/config.json"

export default Vue.extend({
  data() {
    return {
      //
    };
  },

  mounted() {
    this.loadMatchs();
  },

  methods: {
    setProfilePicture(foto) {
      console.log(foto)
      return foto ? `${url.API_URL}/uploads/${foto}` : "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
    },
    async loadMatchs() {
      await this.$store.dispatch("loadMatchs", this.$store.state.user.token);
      this.$store.commit("saveUser");
    },
  },
});
</script>

<style>
</style>