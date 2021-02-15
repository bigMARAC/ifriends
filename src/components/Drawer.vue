<template>
  <v-navigation-drawer absolute temporary v-model="drawer">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> IFriends </v-list-item-title>
        <v-list-item-subtitle> Olá, {{ $store.state.user.nome }} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-row justify="center" class="py-4">
      <v-img :src="setProfilePicture()" max-width="100" max-height="100" class="rounded-circle"></v-img>
    </v-row>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content @click="item.callback">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Vue from 'vue'
import url from './../config/config.json'

export default Vue.extend({
  data() {
    return {
      drawer: false,
      items: [
        { icon: "mdi-book-open-page-variant", title: "Combinações", callback: () => this.open("/match") },
        { icon: "mdi-compass", title: "Explore", callback: () => this.open("/explore") },
        { icon: "mdi-account", title: "Perfil", callback: () => this.open("/profile") },
        { icon: "mdi-logout", title: "Sair", callback: () => this.logout() },
      ]
    }
  },
  methods: {
    open(page) {
      this.$router.push(page)
    },
    setProfilePicture() {
      return `${url.API_URL}/uploads/${this.$store.state.user.foto}` ?? "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
    },
    logout() {
      localStorage.removeItem('user')
      this.$router.push('/')
    }
  }
})
</script>
