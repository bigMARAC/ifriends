<template>
  <v-form ref="login_form" v-model="valid">
    <v-text-field
      v-model="userData.name"
      class="my-2"
      prepend-icon="mdi-account-box"
      label="Nome"
      :rules="nameRules"
      required
      clearable
    ></v-text-field>

    <v-text-field
      class="my-2"
      prepend-icon="mdi-id-card"
      v-model="userData.login"
      label="Matrícula"
      :rules="loginRules"
      required
      clearable
      :counter="10"
    ></v-text-field>

    <v-file-input
      v-model="userData.foto"
      prepend-icon="mdi-camera"
      accept="image/jpg, image/jpeg, image/png, image/gif"
      label="Foto de Perfil"
      chips
    ></v-file-input>

    <v-select
      class="my-2"
      prepend-icon="mdi-book"
      v-model="selectTurma"
      :items="turmas"
      :rules="[(v) => !!v || 'Turma é um campo obrigatório']"
      label="Turma"
      required
    ></v-select>

    <v-text-field
      class="my-2"
      prepend-icon="mdi-instagram"
      v-model="userData.instagram"
      label="Instagram"
      clearable
    ></v-text-field>

    <v-text-field
      class="my-2"
      prepend-icon="mdi-whatsapp"
      v-model="userData.phone"
      label="Telefone"
      :rules="[(v) => !!v || 'Telefone é um campo obrigatório']"
      required
      clearable
    ></v-text-field>

    <v-textarea
      prepend-icon="mdi-comment-account"
      label="Biografia"
      v-model="userData.desc"
      auto-grow
      rows="1"
      row-height="15"
      required
      clearable
    ></v-textarea>

    <v-text-field
      v-model="userData.password"
      class="my-2"
      prepend-icon="mdi-lock"
      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="passwordShow ? 'text' : 'password'"
      name="Password Input"
      label="Senha"
      counter
      @click:append="passwordShow = !passwordShow"
    ></v-text-field>
    <v-text-field
      v-model="userData.passwordConfirm"
      class="my-2"
      prepend-icon="mdi-lock"
      :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordConfirmRules"
      :type="passwordShow ? 'text' : 'password'"
      name="Password Input 02"
      label="Repita sua Senha"
      @click:append="passwordShow = !passwordShow"
    ></v-text-field>
    <v-row>
      <v-col cols="12">
        <p class="font-weight-medium text-left">
          Escolha 3 matérias do seu interesse:
        </p>
        <p class="grey--text caption text-left">
          Essas matérias aparecerão no seu perfil, para que as outras pessoas
          saibam os seus interesses.
        </p>
        <v-chip-group active-class="primary" multiple>
          <v-chip
            v-for="subject in $store.state.user.subjects"
            :key="subject.nome"
            label
            @click="select(subject)"
          >
            {{ subject.nome }}</v-chip
          >
        </v-chip-group>
      </v-col>
      <v-col cols="12" class="mb-5">
        <v-btn @click="register" block color="primary" class="my-3">
          <span v-if="!loading"> Registrar </span>
          <v-progress-circular
            class="p-2"
            v-else
            indeterminate
          ></v-progress-circular>
        </v-btn>
      </v-col>
    </v-row>
    <!-- Error handling -->
    <v-snackbar color="error" :timeout="3000" v-model="error">
      <span>
        {{ errorMessage }}
      </span>
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="error = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script>
import Vue from "vue";
import RegisterRequest from "./../../requests/RegisterRequest";
import MeRequest from "./../../requests/MeRequest";
import PictureRequest from "./../../requests/PictureRequest"

export default Vue.extend({
  data() {
    return {
      passwordShow: false,
      selectTurma: null,
      valid: false,
      loading: false,
      error: false,
      errorMessage: "Erro",
      userData: {
        login: "",
        password: "",
        passwordConfirm: "",
        name: "",
        phone: "",
        instagram: "",
        desc: "",
        foto: null,
      },
      turmas: [
        "IA18", "CA18", "THA18", "THB18", "AGRO18",
        "IA19", "CA19", "THA19", "THB19", "AGRO19",
        "IA20", "CA20", "THA20", "THB20", "AGRO20"
        ],
      ids: [],
      materias: {},
      loginRules: [
        (login) => !!login || "A matrícula é um campo obrigatório",
        (login) => login.length == 10 || "A matrícula possui 10 caracteres",
      ],
      passwordRules: [
        (password) => !!password || "A senha é um campo obrigatório",
        (password) =>
          password.length >= 8 || "A senha precisa possuir 8 caracteres",
      ],
      passwordConfirmRules: [
        (passwordConfirm) => !!passwordConfirm || "É um campo obrigatório",
        (passwordConfirm) =>
          passwordConfirm.length >= 8 || "A senha precisa possuir 8 caracteres",
      ],
      nameRules: [(name) => !!name || "Nome é um campo obrigatório"],
    };
  },
  async mounted() {
    await this.$store.dispatch("loadSubjects", this.$store.state.user.token);

    this.materias = this.$store.state.user.subjects;
  },
  methods: {
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
    async register() {
      try {
        if (
          this.$refs.login_form.validate() &&
          this.userData.password == this.userData.passwordConfirm
        ) {
          this.loading = true;

          const ids = this.ids.map((el) => el.id);

          const registerRequest = new RegisterRequest(
            this.userData.name,
            this.userData.login,
            this.selectTurma,
            this.userData.instagram,
            this.userData.phone,
            this.userData.desc,
            this.userData.password,
            ids
          );


          const registerResponse = await registerRequest.send();

          this.$store.dispatch(
            "triggerSetToken",
            registerResponse.data.aluno.token
          );

          const meRequest = new MeRequest(this.$store.state.user.token);
          await meRequest.send();

          const pictureRequest = new PictureRequest(
            this.$store.state.user.token,
            this.userData.foto
          )

          const fotoResponse = await pictureRequest.send()

          this.$store.dispatch("triggerSetUser", fotoResponse.data.aluno);

          await this.$store.dispatch(
            "loadSubjects",
            this.$store.state.user.token
          );
          await this.$store.dispatch("loadUsers", this.$store.state.user.token);
          await this.$store.dispatch(
            "loadMatchs",
            this.$store.state.user.token
          );

          this.$store.commit("saveUser");
          this.$router.push("/explore");
        } else {
          this.errorMessage = "Campos inválidos.";
          this.error = true;
        }
      } catch (error) {
        this.errorMessage = error.response.data.erro;
        this.error = true;
        this.loading = false;
      }
    },
  },
});
</script>
