<template>
  <v-form class="my-2">
    <v-row align="end" justify="center">
      <v-col align="center" class="py-2" cols="12">
        <v-avatar class="profile" size="150" tile>
          <v-img :src="setProfilePicture()"></v-img>
        </v-avatar>
      </v-col>
    </v-row>
    <v-col class="pt-4">
      <v-text-field outlined v-model="$store.state.user.nome" label="Nome"></v-text-field>
      <v-textarea outlined v-model="$store.state.user.descricao" label="Biografia"></v-textarea>
    </v-col>
    <v-row class="px-6">
      <v-chip-group column center-active>
        <v-chip v-for="subject in $store.state.user.subjects" :key="subject.nome" color="primary" label> {{ subject.nome }}</v-chip>
      </v-chip-group>
    </v-row>
    <v-btn
      bottom
      right
      fixed
      fab
      color="primary"
      @click="save"
    >
      <v-icon>mdi-content-save</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
import Vue from "vue"
import UpdateUserRequest from "./../../requests/UpdateUserRequest.js"

export default Vue.extend({
  data() {
    return {
      user: {}
    }
  },
  components: {},
  methods: {
    setProfilePicture() {
      return this.$store.state.user.foto ?? "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
    },
    async save() {
      const request = new UpdateUserRequest(this.$store.state.user.token, {
        nome: this.$store.state.user.nome,
        descricao: this.$store.state.user.descricao,
        foto: this.$store.state.user.foto,
      })

      const response = await request.send()

      return response
    }
  },
  mounted() {
    this.user = this.$store.state.user
  }
});
</script>

<style>
</style>