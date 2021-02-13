<template>
  <v-form ref="login_form" v-model="valid">
    <v-text-field
      class="my-2"
      prepend-icon="mdi-account"
      v-model="userData.login"
      label="Matrícula"
      :rules="loginRules"
      required
      clearable
      :counter="10"
    ></v-text-field>
    <v-text-field
      v-model="userData.password"
      class="my-2"
      prepend-icon="mdi-lock"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordRules"
      :type="show ? 'text' : 'password'"
      label="Senha"
      counter
      @click:append="show = !show"
      required
      clearable
    ></v-text-field>
    <v-row class="my-3">
      <v-col cols="6">
        <v-btn @click="login" block color="primary">
          <span v-if="!loading"> Entrar </span>
          <v-progress-circular
            class="p-2"
            v-else
            indeterminate
          ></v-progress-circular>
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn :to="'/register'" block color="primary" outlined>
          <span class="black--text"> Cadastre-se </span>
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
import Vue from "vue"
import LoginRequest from "./../../requests/LoginRequest.js"
import MeRequest from "./../../requests/MeRequest.js"

export default Vue.extend({
  data() {
    return {
      error: false,
      errorMessage: "Erro genérico",
      show: false,
      valid: false,
      loading: false,
      userData: {
        login: "",
        password: "",
      },
      loginRules: [
        (login) => !!login || "A matrícula é um campo obrigatório",
        (login) => login.length == 10 || "A matrícula possui 10 caracteres",
      ],
      passwordRules: [
        (password) => !!password || "A senha é um campo obrigatório",
        (password) =>
          password.length >= 8 || "A senha precisa possuir 8 caracteres",
      ],
    }
  },
  methods: {
    async login() {
      try {
        if (this.$refs.login_form.validate()) {
          this.loading = true

          const loginRequest = new LoginRequest(
            this.userData.login,
            this.userData.password
          )
          const loginResponse = await loginRequest.send()

          this.$store.dispatch("triggerSetToken", loginResponse.data.token)
          
          const meRequest = new MeRequest(this.$store.state.user.token)
          const meResponse = await meRequest.send()

          this.$store.dispatch("triggerSetUser", meResponse.data.aluno)

          await this.$store.dispatch("loadSubjects", this.$store.state.user.token)
          await this.$store.dispatch("loadUsers", this.$store.state.user.token)

          this.$store.commit("saveUser")
          this.$router.push("/explore")
        } else {
          this.errorMessage = "Campos inválidos."
          this.error = true
        }
      } catch (error) {
        this.errorMessage = error.response.data.erro
        this.error = true
        this.loading = false
      }
    },
  },
})
</script>
