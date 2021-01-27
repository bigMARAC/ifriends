<template>
  <v-row class="px-4" style="height: 80vh" justify="center" align="center">
    <v-col cols="12" md="3" lg="3" align="center">
      <Logo/>
      <LoginForm/>
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
import LoginForm from "./LoginForm.vue"
import Logo from "../../components/Logo.vue"

export default Vue.extend({
  components: {
    LoginForm,
    Logo
  }
});
</script>

<style scoped lang="scss">
.stroke-purple {
  border: 1px solid #3c096c;
}
</style>