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
      v-model="userData.name"
      class="my-2"
      prepend-icon="mdi-account-box"
      label="Nome"
      :rules="nameRules"
      required
      clearable
    ></v-text-field>
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
      :type="passwordConfirmShow ? 'text' : 'password'"
      name="Password Input 02"
      label="Repita sua Senha"
      @click:append="passwordShow = !passwordShow"
    ></v-text-field>
    <v-row>
      <v-col cols="12">
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

export default Vue.extend({
  data() {
    return {
      passwordShow: false,
      valid: false,
      loading: false,
      error: false,
      userData: {
        login: "",
        password: "",
        passwordConfirm: "",
        name: "",
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
      passwordConfirmRules: [
        (passwordConfirm) => !!passwordConfirm || "É um campo obrigatório",
        (passwordConfirm) =>
          passwordConfirm.length >= 8 || "A senha precisa possuir 8 caracteres",
      ],
      nameRules: [(name) => !!name || "Nome é um campo obrigatório"],
    };
  },
  methods: {
    async register() {
      try {
        if (
          this.$refs.login_form.validate() &&
          this.userData.password == this.userData.passwordConfirm
        ) {
          this.loading = true;

          const registerRequest = new RegisterRequest(
            this.userData.login,
            this.userData.password,
            this.userData.name
          );

          const registerResponse = await registerRequest.send();

          this.$store.dispatch(
            "triggerSetToken",
            registerResponse.data.accessToken
          );

          const meRequest = new MeRequest(this.$store.state.user.token);
          const meResponse = await meRequest.send();

          this.$store.dispatch("triggerSetUser", meResponse.data);
          this.$router.push("/explore");
        } else {
          this.errorMessage = "Campos inválidos.";
          this.error = true;
        }
      } catch (error) {
        this.errorMessage = error.response.data.message;
        this.error = true;
        this.loading = false;
      }
    },
  },
});
</script>
