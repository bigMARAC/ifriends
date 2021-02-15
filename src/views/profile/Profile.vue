<template>
  <v-form class="my-2">
    <v-row align="end" justify="center">
      <v-col align="center" class="py-2" cols="12">
        <v-avatar class="profile rounded-circle" size="200" tile>
          <v-img :src="setProfilePicture()"></v-img>
        </v-avatar>
      </v-col>
    </v-row>
    <v-col class="pt-4">
      <v-text-field
        outlined
        v-model="$store.state.user.nome"
        label="Nome"
      ></v-text-field>
      <v-textarea
        outlined
        v-model="$store.state.user.desc"
        label="Biografia"
      ></v-textarea>
    </v-col>
    <v-row class="px-6">
      <v-chip-group
        column
        center-active
        active-class="primary"
        multiple
        v-model="materias"
      >
        <v-chip
          v-for="subject in $store.state.user.subjects"
          :key="subject.nome"
          :value="subject.id"
          label
          @click="select(subject)"
        >
          {{ subject.nome }}</v-chip
        >
      </v-chip-group>
    </v-row>
    <v-btn bottom right fixed fab color="primary" @click="save">
      <v-icon>mdi-content-save</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
import Vue from "vue";
import UpdateUserRequest from "./../../requests/UpdateUserRequest.js";
import MeRequest from "./../../requests/MeRequest.js";
import url from './../../config/config.json'

export default Vue.extend({
  data() {
    return {
      materias: [],
      user: {},
      ids: [],
    };
  },
  components: {},
  methods: {
    setProfilePicture() {
      return (
        `${url.API_URL}/uploads/${this.$store.state.user.foto}` ??
        "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
      );
    },
    select(subject) {
      let ocurrences = this.ids.find((el) => el.id == subject.id);
      if (ocurrences !== undefined) {
        this.ids = this.ids.filter((el) => el.id != subject.id);
      } else {
        this.ids.push(subject);
      }
      const ids = this.ids.map((el) => el.id);
      console.log(ids);
    },
    async save() {
      const ids = this.ids.map((el) => el.id);

      const request = new UpdateUserRequest(this.$store.state.user.token, {
        nome: this.$store.state.user.nome,
        desc: this.$store.state.user.desc,
        aluno_id: this.$store.state.user.id,
        ids,
      });

      await request.send();

      const meRequest = new MeRequest(this.$store.state.user.token);
      const meResponse = await meRequest.send();

      this.$store.dispatch("triggerSetUser", meResponse.data.aluno);

      await this.$store.dispatch("loadSubjects", this.$store.state.user.token);
      await this.$store.dispatch("loadUsers", this.$store.state.user.token);
      await this.$store.dispatch("loadMatchs", this.$store.state.user.token);

      this.$store.commit("saveUser");

      this.materias = []
      this.ids = []
      this.listUserSubjects();

      return meResponse;
    },
    listUserSubjects() {
      for (const materia of this.$store.state.user.materias) {
        this.materias.push(materia.id);
      }
    },
  },
  mounted() {
    this.listUserSubjects();
  },
});
</script>

<style>
</style>