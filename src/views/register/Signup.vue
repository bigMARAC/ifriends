<template>
  <v-row class="px-4" style="height: 80vh" justify="center" align="center">
    <v-col cols="12" md="3" lg="3" align="center">
      <Logo />
      <RegisterForm />
      <v-footer padless class="mt-7">
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>MaracTech</strong>
        </v-col>
      </v-footer>
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue"
import RegisterForm from "./RegisterForm.vue"
import Logo from "../../components/Logo.vue"

export default Vue.extend({
  components: {
    RegisterForm,
    Logo,
  },
});
</script>


<style>
</style>